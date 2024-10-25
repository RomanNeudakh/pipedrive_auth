function exchangeAuthorizationCodeForTokens(authorizationCode, redirectUri, res) {
    const tokenUrl = process.env.TOKEN_URL;
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
                    <h1>Authorization Succeeded</h1>
                    <button onclick="window.location.href='https://github.com/RomanNeudakh'">App Info</button>
                </body>
            </html>
        `);
        console.log(`access_token: ${data.access_token} `);
        console.log(`token_type: ${data.token_type} `);
        console.log(`expires_in: ${data.expires_in} `);
        console.log(`refresh_token: ${data.refresh_token} `);
    })
    .catch(error => {
        console.error('Error exchanging authorization code:', error);
        res.send('Failed to exchange authorization code.');
    });
}

export default exchangeAuthorizationCodeForTokens;