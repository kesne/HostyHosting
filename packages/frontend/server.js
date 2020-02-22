const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({
    // base directory where everything is, could move to src later
    dir: '.',
    dev
});

const handle = app.getRequestHandler();

const server = express();

app.prepare()
    .then(() => {
        // Set up the proxy.
        if (dev) {
            const proxyMiddleware = require('http-proxy-middleware');
            server.use(
                proxyMiddleware('/api', {
                    target: 'http://backend:1337',
                    changeOrigin: true
                })
            );
        }

        // Default catch-all handler to allow Next.js to handle all other routes
        server.all('*', (req, res) => handle(req, res));

        server.listen(port, err => {
            if (err) {
                throw err;
            }
            console.log(`> Ready on port ${port} [${env}]`);
        });
    })
    .catch(err => {
        console.log('An error occurred, unable to start the server');
        console.log(err);
    });
