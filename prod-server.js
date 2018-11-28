const express = require('express');
const proxyServer = require('./proxy-server');
const app = express();
require('dotenv').config();

const PORT = 8080; //process.env.PORT | 3000;

proxyServer(app);

app.listen(PORT, function () {
  console.log(`Static server listening on port ${PORT}.`)
})
