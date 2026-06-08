/**
 * Helper script to obtain a OneDrive Refresh Token.
 */
import "dotenv/config";
import axios from "axios";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function getRefreshToken() {
    const clientId = process.env.ONEDRIVE_CLIENT_ID;
    const clientSecret = process.env.ONEDRIVE_CLIENT_SECRET;
    const redirectUri = "http://localhost:3000"; // Must be added to your Redirect URIs in Azure Portal

    if (!clientId) {
        console.error("Error: ONEDRIVE_CLIENT_ID is missing in .env");
        process.exit(1);
    }

    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&response_mode=query&scope=offline_access%20Files.ReadWrite.All`;

    console.log("\n1. Open this URL in your browser and log in:");
    console.log("-------------------------------------------");
    console.log(authUrl);
    console.log("-------------------------------------------\n");

    rl.question("2. After authorizing, you will be redirected to localhost. Paste the 'code' from the URL here: ", async (code) => {
        try {
            const decodedCode = decodeURIComponent(code.trim());
            console.log("\nExchanging code for Refresh Token...");
            
            const params = new URLSearchParams();
            params.append("client_id", clientId);
            if (clientSecret) params.append("client_secret", clientSecret);
            params.append("code", decodedCode);

            params.append("grant_type", "authorization_code");
            params.append("redirect_uri", redirectUri);

            const response = await axios.post(
                "https://login.microsoftonline.com/common/oauth2/v2.0/token",
                params
            );

            console.log("\nSUCCESS!");
            console.log("Add this to your .env file:");
            console.log("-------------------------------------------");
            console.log(`ONEDRIVE_REFRESH_TOKEN="${response.data.refresh_token}"`);
            console.log("-------------------------------------------\n");
            
        } catch (error: any) {
            console.error("\nFAILED to get refresh token:");
            console.error(error.response?.data || error.message);
        }
        rl.close();
    });
}

getRefreshToken();
