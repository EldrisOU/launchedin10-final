const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Handle Clean URLs
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    let filePath = '.' + parsedUrl.pathname;

    if (filePath === './') {
        filePath = './index.html';
    }

    const setContentType = (ext) => {
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
    };

    const serveFile = (targetPath) => {
        const extname = path.extname(targetPath);

        fs.readFile(targetPath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // Try appending .html for clean URLs
                    if (extname === '') {
                        serveFile(targetPath + '.html');
                        return;
                    }

                    fs.readFile('./404.html', (error, content404) => {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content404 || '404 Not Found', 'utf-8');
                    });
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${err.code}`);
                }
            } else {
                setContentType(extname || '.html'); // Default to html if clean URL success
                res.writeHead(200);
                res.end(content, 'utf-8');
            }
        });
    };

    serveFile(filePath);
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
