/**
 * OneDrive Service — OGEFREM Representation WELL
 * 
 * Supports PERSONAL and BUSINESS OneDrive using a Refresh Token.
 */

import "isomorphic-fetch";
import { Client } from "@microsoft/microsoft-graph-client";
import { logger } from "@/lib/logger";
import { AppError } from "@/lib/errors";
import axios from "axios";

export interface UploadedFile {
    fileId: string;
    url: string;
    filename: string;
}

let graphClient: Client | null = null;
let currentAccessToken: string | null = null;

async function getAccessToken(): Promise<string> {
    const clientId = process.env.ONEDRIVE_CLIENT_ID;
    const clientSecret = process.env.ONEDRIVE_CLIENT_SECRET;
    const refreshToken = process.env.ONEDRIVE_REFRESH_TOKEN;

    if (!clientId || !refreshToken) {
        throw new AppError("OneDrive configuration is missing (Client ID or Refresh Token)", 500);
    }

    try {
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        if (clientSecret) params.append("client_secret", clientSecret);
        params.append("refresh_token", refreshToken);
        params.append("grant_type", "refresh_token");

        // Use 'common' for Personal/Multi-tenant accounts
        const response = await axios.post(
            "https://login.microsoftonline.com/common/oauth2/v2.0/token",
            params
        );

        return response.data.access_token;
    } catch (error: any) {
        logger.error({ error: error.response?.data || error.message }, "Error refreshing OneDrive token");
        throw new AppError("Failed to refresh OneDrive access token", 500);
    }
}

async function getGraphClient(): Promise<Client> {
    if (graphClient && currentAccessToken) return graphClient;

    graphClient = Client.init({
        authProvider: async (done) => {
            try {
                const token = await getAccessToken();
                currentAccessToken = token;
                done(null, token);
            } catch (error) {
                done(error as Error, null);
            }
        },
    });

    return graphClient;
}

/**
 * Find or create a folder by name under a given parent.
 */
async function getOrCreateFolder(
    client: Client,
    name: string,
    parentId: string = "root"
): Promise<string> {
    try {
        // Search for existing folder
        // Note: $filter is NOT supported on personal OneDrive for children listing
        const childrenRes = await client
            .api(`/me/drive/items/${parentId}/children`)
            .get();

        const existing = childrenRes.value?.find(
            (item: any) => item.name === name && item.folder
        );

        if (existing) {
            return existing.id;
        }

        // Create the folder
        const folder = await client.api(`/me/drive/items/${parentId}/children`).post({
            name,
            folder: {},
            "@microsoft.graph.conflictBehavior": "fail",
        });

        logger.info({ folderName: name, parentId }, "Created OneDrive folder");
        return folder.id;
    } catch (error: any) {
        logger.error({ folderName: name, parentId, error: error.body || error }, "Error in getOrCreateFolder");
        if (error.code === "itemAlreadyExists") {
            // Race condition: someone else created it. Try finding it again.
            const childrenRes = await client
                .api(`/me/drive/items/${parentId}/children`)
                .get();
            const existing = childrenRes.value?.find(
                (item: any) => item.name === name && item.folder
            );
            if (existing) return existing.id;
        }
        throw error;
    }
}


export async function ensureShipmentFolder(
    clientName: string,
    feriNumber: string,
    date: Date = new Date()
): Promise<string> {
    const client = await getGraphClient();
    const rootFolderId = process.env.ONEDRIVE_ROOT_FOLDER_ID || "root";

    const year = date.getFullYear().toString();
    const monthName = date.toLocaleString("en-US", { month: "long" });
    const monthFolder = `${monthName} ${year}`;
    const shipmentFolder = `${clientName.toUpperCase()}_${feriNumber}`;

    const yearFolderId = await getOrCreateFolder(client, year, rootFolderId);
    const monthFolderId = await getOrCreateFolder(client, monthFolder, yearFolderId);
    const shipmentFolderId = await getOrCreateFolder(client, shipmentFolder, monthFolderId);

    return shipmentFolderId;
}

export async function uploadFileToOneDrive(
    fileBuffer: Buffer,
    mimeType: string,
    filename: string,
    folderId: string
): Promise<UploadedFile> {
    const client = await getGraphClient();

    const res = await client
        .api(`/me/drive/items/${folderId}:/${filename}:/content`)
        .put(fileBuffer);

    let driveUrl = res.webUrl;
    try {
        // Create a sharing link (public view) to match Google Drive behavior
        const shareRes = await client
            .api(`/me/drive/items/${res.id}/createLink`)
            .post({ type: "view", scope: "anonymous" });
        driveUrl = shareRes.link.webUrl || res.webUrl;
    } catch (shareError: any) {
        logger.warn({ filename, error: shareError.body || shareError }, "Could not create public sharing link");
    }

    logger.info({ filename, fileId: res.id, folderId }, "File uploaded to OneDrive");

    return {
        fileId: res.id,
        url: driveUrl,
        filename,
    };
}


export async function deleteFileFromOneDrive(fileId: string): Promise<void> {
    const client = await getGraphClient();
    try {
        await client.api(`/me/drive/items/${fileId}`).delete();
        logger.info({ fileId }, "Deleted file from OneDrive");
    } catch (err: any) {
        if (err.code === "itemNotFound") {
            logger.warn({ fileId }, "File not found on OneDrive");
        } else {
            logger.error({ fileId, err }, "Failed to delete file from OneDrive");
        }
    }
}

export function buildVersionedFilename(baseType: string, version: number, ext: string): string {
    return `${baseType}_v${version}.${ext}`;
}

/**
 * Get a direct download stream for a file from OneDrive
 */
export async function getDownloadStream(fileId: string): Promise<ReadableStream> {
    const client = await getGraphClient();
    const response = await client.api(`/me/drive/items/${fileId}/content`).get();
    return response as ReadableStream;
}


