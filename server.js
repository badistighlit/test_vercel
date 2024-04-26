const express = require('express');
const httpProxy = require('http-proxy');
const cors = require('cors');
const app = express();

app.use(cors()); 

// configuration des routes

app.get('/', (req, res) => {
    res.send("Hello test zbi ! ");
  });



// et le serveur démarre
const port = 3000;
app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});