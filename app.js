import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import exchangeAuthorizationCodeForTokens from './api/fetchAuth.js';
import createDealField from './api/createDealFields.js';
import dealFields from './contants/dealFields.js';
import updateDeal from './api/fillDealFields.js';

dotenv.config();
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

app.post('/form', async (req, res) => {
    const receivedData = req.body;
    const dealId = receivedData.queryObject.selectedIds;
    updateDeal(receivedData, dealId);
})
app.get('/', async (req, res) => {
    const authorizationCode = req.query.code;
    if (authorizationCode) {
        const redirectUri = `https://${req.get('host')}${req.path}`;
        exchangeAuthorizationCodeForTokens(authorizationCode, redirectUri, res);
        for (const dealField of dealFields) {
            const key = await createDealField(dealField);
            dealField.key = key;
        }
    } else {
        console.log('Authorization failed or user denied access.');
        return;
    }
});
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});