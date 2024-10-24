const express = require('express');
const app = express();
const port = 8080;

function exchangeAuthorizationCodeForTokens(authorizationCode, redirectUri, res) {
    const tokenUrl = 'https://oauth.pipedrive.com/oauth/token';
    const clientId = '1e6dc3b592267abb';
    const clientSecret = '59ae03a99cdc27f1039ef081e54980aad9629553';
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
                <body style="display: flex; justify-content: center; align-items: center;>
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

app.get('/', (req, res) => {
    const authorizationCode = req.query.code;
    const userId = req.query.userId;
    if (authorizationCode) {
        const redirectUri = `https://${req.get('host')}${req.path}`;
        console.log(`Received authorization code: ${authorizationCode}`);
        console.log(`redirectUri: ${redirectUri}`);
        exchangeAuthorizationCodeForTokens(authorizationCode, redirectUri, res);
    } else if (userId) {
        // app logic
        console.log(`hi`);
    } else {
        console.log('Authorization failed or user denied access.');
        return;
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
