const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const { User } = require('./models/User');

//On utilise dotenv pour récupérer nos variables d'environnement
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB'))

const port = process.env.PORT || 3000;

const plaid = require('plaid');

const client = new plaid.Client({
    clientID: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    env: plaid.environments.sandbox,
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/get_link_token', (req, res) => {
    // console.log(req.body.email);
    // User.findOne({ email: req.body.email }).then(user => console.log(user._id));
    User.findOne({ email: req.body.email }).then(user => {
        const configs = {
            user: {
                //On récupère un id unique pour notre utilisateur
                client_user_id: user._id,
            },
            client_name: 'Plaid Auth App Test',
            products: ['auth'],
            country_codes: ['FR'],
            language: 'fr',
        };

        client.createLinkToken(configs, (error, createTokenResponse) => {
            if (error != null) {
                console.error(error);
                return res.json({
                    error: error,
                });
            }
            res.json(createTokenResponse);
        })
    })
})

app.post('/get_access_token', (req, res) => {
    const PUBLIC_TOKEN = req.body.public_token;

    // client.exchangePublicToken(PUBLIC_TOKEN).then(tokenResponse => {
    //     const ACCESS_TOKEN = tokenResponse.access_token;
    //     const ITEM_ID = tokenResponse.item_id;
    //     console.log(ACCESS_TOKEN, ITEM_ID);
    // })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
