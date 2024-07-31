const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');

// Carregar as credenciais do cliente OAuth2
const CLIENT_ID = ' ';
const CLIENT_SECRET = ' ';
const REDIRECT_URI = 'http://localhost';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Gerar a URL de autorização
const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://mail.google.com/'],
});

console.log('Authorize this app by visiting this url:', authUrl);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
        if (err) {
            console.error('Error retrieving access token', err);
            return;
        }
        oAuth2Client.setCredentials(token);
        console.log('Access Token and Refresh Token:', token);

        // Salve os tokens em um arquivo, se desejar
        fs.writeFileSync('tokens.json', JSON.stringify(token));

        // Agora você pode usar o oAuth2Client para fazer chamadas autenticadas para a API do Gmail
    });
});
