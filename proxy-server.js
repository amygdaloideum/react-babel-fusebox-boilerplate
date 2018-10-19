const path = require('path');
const proxy = require('http-proxy-middleware');
const express = require('express');

const apiKeyMiddleware = (req, res, next) => {
  req.headers['X-API-KEY'] = process.env.GLL_API_KEY;
  return next();
};

function devServer(app) {
  const dist = path.resolve('./build');
  //app.use(apiKeyMiddleware);
  app.use(express.static(dist));
  app.use(
    '/api/paymentiq',
    proxy({
      target: process.env.PAYMENTIQ_API_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/paymentiq': '/',
      },
    })
  );
  app.get('*', (req, res) => {
    res.sendFile(path.join(dist, 'index.html'));
  });
}

module.exports = devServer;
