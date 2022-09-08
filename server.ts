// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

import { readFileSync } from 'fs';


// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const domino = require('domino');
var fs = require('fs');
var http = require('http');
var https = require('https');
var compression = require('compression');
var serveStatic = require('serve-static');


/*************************/

// var privateKey  = fs.readFileSync('C:/sslcert/pulsein.ir_key.pem', 'utf8');
// var certificate = fs.readFileSync('C:/sslcert/pulsein.ir_crt.pem', 'utf8');
// var ca = fs.readFileSync('C:/sslcert/certum_ca.pem', 'utf8');


var privateKey = fs.readFileSync('/srv/www/keys/pulsein.app_key.pem', 'utf8');
var certificate = fs.readFileSync('/srv/www/keys/pulsein.app_crt.pem', 'utf8');
var ca = fs.readFileSync('/srv/www/keys/certum_ca.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate, ca : ca};
/*************************/

// Express server
const app = express();
app.use(compression());


const PORT = process.env.PORT || 80;
const DIST_FOLDER = join(process.cwd(), 'dist');

const template = readFileSync(join(DIST_FOLDER + "/browser", 'index.html')).toString(); // use `index.html` as template (3)
const win = domino.createWindow(template); // create object Window(4)
global['Event'] = win.Event;  // assign the `win.Event` to prop `Event`(5)


// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});

// Server static files from /browser
//app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

app.use(serveStatic(join(DIST_FOLDER, 'browser'), {
  maxAge: '15d',
  setHeaders: setCustomCacheControl
}))



// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server(obsolete)
// app.listen(PORT, () => {
   //console.log(`Node server listening on http://localhost:${PORT}`);
// });



/************obsolete***********
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(443);
var httpServer = http.createServer(function (req:any, res:any) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);
/**********************/

/***********************/
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443);
/**********************/

function setCustomCacheControl (res:any, path:any) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
}


//var httpserver = http.createServer(app).listen(80);

