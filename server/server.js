const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

let HTML = '\\' + 'HTML' + '\\' + 'index.html';

let dirname = __dirname.slice(0, __dirname.search('server') - 1);

const server = http.createServer((req,res) => {
	let filePath = path.join(dirname, req.url === '/' ?  HTML : req.url);

	let extName = path.extname(filePath);

	let contentType = 'text/html';

	switch(extName) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
		case '.png':
			contentType = 'image/png';
			break;
	}

	fs.readFile(filePath, (err, content) => {
		res.writeHead(200, {'Content-type': contentType});
		res.end(content, 'utf8');
	});
});

let port = process.env.PORT || 8000;

server.listen(port, () => {console.log(port)});