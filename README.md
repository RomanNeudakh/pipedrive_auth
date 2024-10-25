# Pipedrive Authentication Setup with Ngrok

Follow these steps to set up ngrok for Pipedrive authentication.

### 1. Download and Set Up ngrok

1. Visit the [ngrok download page](https://ngrok.com/download) and sign in or create a free account.
2. Download the appropriate version for your operating system (e.g., Windows).
3. Unzip the downloaded file to a preferred location on your computer, e.g., `C:\ngrok`.

### 2. Configure ngrok Authentication

1. Open a command prompt and navigate to the directory where ngrok is located.
2. Run the following command to add your authtoken to the default `ngrok.yml` configuration file:

    ```bash
    ngrok config add-authtoken <your authtoken>
    ```

   - You can find your authtoken on the ngrok dashboard. This token is required to authenticate your ngrok client with your account.

### 3. Start ngrok

1. To put your app online with an ephemeral domain, run ngrok to forward requests to your local service.
2. If your service is listening on `http://localhost:8080`, use the following command:

    ```bash
    ngrok http http://localhost:8080
    ```

3. This command will give you a public URL (e.g., `https://abcdefg.ngrok.io`) displayed in the command prompt.

4. **For testing purposes**, use the ngrok forwarding URL (e.g., `https://84db-87-205-142-12.ngrok-free.app`) as the callback URL in your Pipedrive app settings.

   - Navigate to the "App Settings" => "Basic info" section in your Pipedrive app (Sandbox).
   - Set the `Callback URL` field to your ngrok forwarding address (e.g., `https://84db-87-205-142-12.ngrok-free.app`).

### 4. Set Up Environment Variables

1. In the root directory of your project, create a `.env` file with the following content:

    ```env
    CLIENT_ID=<your client id>
    CLIENT_SECRET=<your secret key>
    ```

Replace `<your client id>` and `<your secret key>` with your actual Pipedrive API credentials.

### Useful Links

- [ngrok Download](https://ngrok.com/download) - Download ngrok for your OS.
- [ngrok Dashboard](https://dashboard.ngrok.com/) - Access your account and authtoken.
- [Pipedrive Developer Portal](https://pipedrive.readme.io/) - Documentation and credentials for Pipedrive API integration.
- [Pipedrive API Documentation](https://developers.pipedrive.com/docs/api/v1/) - Complete API reference for Pipedrive.
