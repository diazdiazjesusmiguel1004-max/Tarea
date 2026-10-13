const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Normalizar la URL (si entra a raíz "/", cargamos "index.html")
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Manejo especial si el usuario envía el formulario de contacto (método POST)
    if (req.url === '/enviar-contacto' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            // Aquí puedes procesar los datos si deseas, luego redirigimos a la página de éxito
            res.writeHead(302, { 'Location': '/gracias.html' });
            res.end();
        });
        return;
    }

    // Extensión del archivo solicitado
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    switch (ext) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
        case '.webp':
            contentType = 'image/webp';
            break;
        case '.pdf':
            contentType = 'application/pdf';
            break;
    }

    // Leer el archivo de la carpeta public
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err404, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content404 || 'Página no encontrada');
                });
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('Error interno del servidor');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Portafolio en funcionamiento en http://localhost:${PORT}`);
});