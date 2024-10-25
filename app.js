import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import exchangeAuthorizationCodeForTokens from './api/fetchAuth.js';

dotenv.config();
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

app.post('/form', async (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Received data:', req.body);
})
app.get('/', async (req, res) => {
    const authorizationCode = req.query.code;
    if (authorizationCode) {
        const redirectUri = `https://${req.get('host')}${req.path}`;
        exchangeAuthorizationCodeForTokens(authorizationCode, redirectUri, res);
    } else {
        console.log('Authorization failed or user denied access.');
        return;
    }
});
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
// base url api https://api.pipedrive.com/v1