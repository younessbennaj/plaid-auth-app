const express = require('express');
const app = express();
app.use(express.json());

//On utilise dotenv pour récupérer nos variables d'environnement
require('dotenv').config();

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
