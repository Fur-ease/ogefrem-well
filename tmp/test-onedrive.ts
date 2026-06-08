/**
 * Temporary test script to verify OneDrive authentication and User ID.
 * Bypasses user profile check to test drive access directly.
 */
import "dotenv/config";
import { Client } from "@microsoft/microsoft-graph-client";
import { ConfidentialClientApplication } from "@azure/msal-node";

async function test() {
    const tenantId = process.env.ONEDRIVE_TENANT_ID;
    const clientId = process.env.ONEDRIVE_CLIENT_ID;
    const clientSecret = process.env.ONEDRIVE_CLIENT_SECRET;
    const userId = process.env.ONEDRIVE_USER_ID;

    console.log("Testing with:", { tenantId, clientId, userId });

    const msalConfig = {
        auth: {
            clientId: clientId!,
            authority: `https://login.microsoftonline.com/${tenantId}`,
            clientSecret: clientSecret!,
        },
    };

    const cca = new ConfidentialClientApplication(msalConfig);

    const client = Client.init({
        authProvider: async (done) => {
            try {
                const tokenResponse = await cca.acquireTokenByClientCredential({
                    scopes: ["https://graph.microsoft.com/.default"],
                });
                done(null, tokenResponse?.accessToken || "");
            } catch (error) {
                done(error as Error, null);
            }
        },
    });

    try {
        console.log(`Checking drive for user: ${userId}`);
        const drive = await client.api(`/users/${userId}/drive`).get();
        console.log("Drive found:", drive.id, drive.driveType);

        console.log("Checking root children...");
        const children = await client.api(`/users/${userId}/drive/root/children`).get();
        console.log(`Found ${children.value.length} items in root.`);

    } catch (error: any) {
        console.error("Error during test:");
        console.error(JSON.stringify(error.body || error, null, 2));
    }
}

test();
