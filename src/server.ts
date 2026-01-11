import dotenv from 'dotenv';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config({ path: '.env.local' });

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const target = process.env['BASE_URL'];
const V4_API_KEY = process.env['V4_API_KEY'];

app.use(
  '/api',
  createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
    headers: {
      Authorization: `Bearer ${V4_API_KEY}`,
    },
    logger: process.env['NODE_ENV'] === 'development' ? console : undefined,
    on: {
      error: (_err, _req, res) => {
        if ('writeHead' in res) {
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Something went wrong.');
        }
      },
    },
  }),
);

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
