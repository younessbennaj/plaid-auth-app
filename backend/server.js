const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
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

app.post('/get_link_token', (req, res) => {
    const configs = {
        user: {
            // This should correspond to a unique id for the current user.
            client_user_id: 'test-user-id',
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

// app.post('/get_link_token', async (request, response) => {
//     try {
//       // Get the client_user_id by searching for the current user
//       const user = await User.find(...);
//       const clientUserId = user.id;
//       // Create the link_token with all of your configurations
//       const tokenResponse = await client.createLinkToken({
//         user: {
//           client_user_id: clientUserId,
//         },
//         client_name: 'My App',
//         products: ['auth'],
//         country_codes: ['US'],
//         language: 'en',
//         webhook: 'https://webhook.sample.com',
//       });
//       response.on({ link_token: tokenResponse.link_token });
//     } catch (e) {
//       // Display error on client
//       return response.send({ error: e.message });
//     }
//   });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
