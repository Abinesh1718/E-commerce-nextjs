const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 5000;

app.prepare().then(() => {
  const server = express();

  // Proxy API requests to the Express server
  server.use('/api', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
