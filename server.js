const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();


//      liens vers les microservices
const userRelationServiceUrl = 'lien vers l api social';
const codeServiceUrl = 'http://localhost:4000';
const authServiceUrl = 'http://localhost:3000';


// configuration des routes

app.get('/', (req, res) => {
    res.send("Hello GateWay ! ");
  });

// Route pour les requêtes liées aux utilisateurs
app.use('/user', (req, res) => {
    proxy.web(req, res, { target: userRelationServiceUrl });
});

// Route pour la publication à l'exécution de script à distance
app.use('/code', (req, res) => {
    proxy.web(req, res, { target: codeServiceUrl });
});

// Route pour l'authentification
app.use('/auth', (req, res) => {
    proxy.web(req, res, { target: authServiceUrl });
});


// gestion des erreurs de proxy
proxy.on('error', (err, req, res) => {
    res.status(500).send('Erreur lors de la redirection');
});



// et le serveur démarre
const port = 5000;
app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});