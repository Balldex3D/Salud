#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const rootDir = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
};

const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Default to index.html
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  // Security: prevent directory traversal
  const safePath = path.normalize(path.join(rootDir, pathname)).replace(/\\/g, '/');
  if (!safePath.startsWith(rootDir.replace(/\\/g, '/'))) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Check if file exists
  const filePath = path.join(rootDir, pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      console.log(`NOT FOUND: ${pathname}`);
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 Not Found</h1>');
      return;
    }

    // Get MIME type
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // Read and serve file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(`ERROR reading ${pathname}:`, err.message);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': data.length,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(data);
      console.log(`OK: ${pathname}`);
    });
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
