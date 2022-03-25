const fs = require('fs');

const host = 'localhost';
const port = 8000;

require('http').createServer((request, response) => {
    if (request.url.includes('parser.js')) {
        fs.readFile('./dist/parser.js', (error, content) => {
            response.writeHead(200, { 'Content-type': 'text/html' });
            response.end(content);
        });
    } else {
        fs.readFile('./example/index.html', (error, content) => {
            response.writeHead(200, { 'Content-type': 'text/html' });
            response.end(content);
        });
    }
}).listen(port, host, () => {
    console.log('Locally listening on http://' + host + ':' + port);
});
