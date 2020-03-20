const proxy = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');
const express = require('express');

let bundler = new Bundler('src/index.html', {
    cache: false
});
let app = express();

app.use(
    '/api',
    proxy({
        target: 'http://backend:1337',
        changeOrigin: true
    })
);

app.use(bundler.middleware());

const port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port, () => {
    console.log(`> Ready on port ${port}`);
});
