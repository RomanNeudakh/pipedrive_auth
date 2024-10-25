import API_PATHS from "../contants/apiPath.js";

function exchangeAuthorizationCodeForTokens(authorizationCode, redirectUri, res) {
    const tokenUrl = API_PATHS.tokenUrl;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', authorizationCode);
    params.append('redirect_uri', redirectUri);

    fetch(tokenUrl, {
        method: 'POST',
        body: params,
        headers: {
            'Authorization': `Basic ${credentials}`, 
            'Content-Type': 'application/x-www-form-urlencoded' 
        }
    })
    .then(response => response.json())
    .then(data => {
        res.send(`
            <html>
                <body style="display: flex; justify-content: center; align-items: center;">
                    <h4>Authorization Succeeded</h4>
                    <button style="display: block; margin-top: 10px;" onclick="window.location.href='https://github.com/RomanNeudakh'">App Info</button>
                </body>
            </html>
        `);
    })
    .catch(error => {
        res.send('Failed to exchange authorization code.');
    });
}

export default exchangeAuthorizationCodeForTokens;