const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8765;
const FOLDER = __dirname;

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(FOLDER, filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            console.log(`NOT FOUND: ${req.url}`);
            return;
        }

        const ext = path.extname(filePath);
        const mimeTypes = {
            '.html': 'text/html; charset=utf-8',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.manifest': 'application/manifest+json'
        };

        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(data);
        console.log(`OK: ${req.url}`);
    });
});

server.listen(PORT, () => {
    console.log(`\n📱 Servidor en puerto ${PORT}`);
    console.log(`🌐 Local: http://localhost:${PORT}`);
    console.log(`📡 iPad: http://192.168.1.13:${PORT}\n`);
});
