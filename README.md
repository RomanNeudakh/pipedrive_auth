# pipedrive_auth

Visit the official ngrok website: https://ngrok.com/download.
Create a free account (or sign in if you already have one).
Download the appropriate version of ngrok for your operating system (Windows in this case).
Once the download is complete, unzip the downloaded file to a location on your computer e.g., C:\ngrok.

Open a command prompt and navigate to the directory where ngrok is located

Run the following command to add your authtoken to the default ngrok.yml configuration file.
ngrok config add-authtoken <your authtoken>

You’ll see your AuthToken in the dashboard. This token is needed to authenticate your ngrok client with your account.

Put your app online at an ephemeral domain forwarding to your upstream service. For example, if it is listening on port http://localhost:8080, run:
ngrok http http://localhost:8080

This will give you a public URL (like https://abcdefg.ngrok.io) that you can find in command prompt ngrok.