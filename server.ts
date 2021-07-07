import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join, resolve } from 'path';

import { AppServerModule } from './src/main.server';
// import { APP_BASE_HREF } from '@angular/common';
// import { existsSync } from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = resolve(join(process.cwd(), 'dist/atlas-orion/browser'));
  // const indexHtml = existsSync(join(distFolder, 'index.original.html'))
  //   ? 'index.original.html'
  //   : 'index';

  /**
   * * Manually resolving joined paths
   */
  const indexHtml = resolve(join(distFolder, 'index.html'));

  /**
   * * Using express.static() to serve
   * * static files in the dist/atlas-orion/browser
   */
  server.use(express.static(distFolder));

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  // server.get(
  //   '*.*',
  //   express.static(distFolder, {
  //     maxAge: '1y',
  //   })
  // );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    // res.render(indexHtml, {
    //   req, res
    // });

    /**
     * * Using res.sendFile() instead
     * * of using res.render() as there
     * * are some bugs regarding html
     * * as a rendering engine
     *
     * ! Reminder:
     * * If you're using firebase, then
     * * make sure you include it as an
     * * external dependency in the "server"
     * * object inside angular.json. For ex:
     * ? "externalDependencies": ["@firebase/firestore"]
     * * to enable offline persistence in your app
     */
    res.sendFile(indexHtml);
  });

  return server;
}

function run() {
  const port = process.env.PORT || 8080;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
