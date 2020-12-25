const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');
const {mailDeliverer} = require('./email');

const server = http.createServer((req, res) => {
	let HTML = 'HTML' + '\\' + 'index.html';
	let successPath = 'contact-us' + '\\' + 'success.html';
	let failurePath = 'contact-us' + '\\' + 'failure.html';
	let notFound = 'HTML' + '\\' + 'notfound.html';

	let dirname = __dirname.slice(0, __dirname.search('SERVER') - 1);
	let filePath = path.join(dirname, req.url === '/' ?  HTML : req.url);
	let filePathSuccess = path.join(dirname, req.url === '/contact-us' ?  successPath : req.url);
	let filePathFailure = path.join(dirname, req.url === '/contact-us' ?  failurePath : req.url);
	console.log(filePath);
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

	if(req.url !== '/contact-us'){
		fs.readFile(filePath, (err, content) => {
			if(err){
				//console.log(err);
				if(err.code == 'ENOENT'){
					fs.readFile(path.join(dirname, err.code == 'ENOENT' ? notFound : req.url), (err,content) => {
						res.writeHead(200, {'Content-type': contentType});
						res.end(content, 'utf8');
					});
				}else{
					res.writeHead(500);
					res.end(`<h1 style="text-align: center; margin-top: 40vh; font-size: 4rem;">Server error: ${err.code}</h1>`);
				}
			}else{
				//console.log(req.url);
				res.writeHead(200, {'Content-type': contentType});
				res.end(content, 'utf8');
			}
		});
	}else if(req.url === '/contact-us'){
		//console.log(req.url);
		if(req.method === 'POST'){
			let body = '';
			let formData;

			req.on('data', (chunk) => {
				body += chunk;
				if(body.length > 1e6){
					req.connection.destroy();
					console.log('Connection destroyed');
				}
			});

			function success(){
				fs.readFile(filePathSuccess, (err, content) => {
					//console.log(req.url);
					if(err){
						if(err.code == 'ENOENT'){
							fs.readFile(path.join(dirname, err.code == 'ENOENT' ? notFound : req.url), (err,content) => {
								res.writeHead(200, {'Content-type': contentType});
								res.end(content, 'utf8');
							});
						}else{
							res.writeHead(500);
							res.end(`Server error: ${err.code}`);
						}
					}else{
						//console.log(filePathSuccess);
						res.writeHead(200, {'Content-type': contentType});
						res.end(content, 'utf8');
					}
				})
			}

			function failure(){
				fs.readFile(filePathFailure, (err, content) => {
					if(err){
						console.log(err);
						if(err.code == 'ENOENT'){
							fs.readFile(path.join(dirname, err.code == 'ENOENT' ? notFound : req.url), (err,content) => {
								res.writeHead(200, {'Content-type': contentType});
								res.end(content, 'utf8');
							});
						}else{
							res.writeHead(500);
							res.end(`Server error: ${err.code}`);
						}
					}else{
						//console.log(filePathFailure);
						res.writeHead(200, {'Content-type': contentType});;
						res.end(content, 'utf8');
					}
				});
			}

			req.on('end', () => {
				formData = parse(body);
				let {name, email, message} = formData;
				let emailOneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
				let emailTwoDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
				let emailThreeDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
				let emailRegEx = emailOneDot.test(email) || emailTwoDots.test(email) || emailThreeDots.test(email);

				if(name == '' || message == ''|| email == ''){
					res.writeHead(200, {'Content-type': contentType});
					res.end('<h1 style="text-align: center; margin-top: 40vh; font-size: 2rem;">Its is a required that all fields be filled in.</h1>');
				}else if(emailRegEx === false){
					res.writeHead(200, {'Content-type': contentType});
					res.end('<h1 style="text-align: center; margin-top: 40vh; font-size: 2rem;">Invalid email</h1>');
				}else{
					mailDeliverer(name, email, message, success, failure);
				}
			});

		}
	}

});

const port = process.env.PORT || 8000;

server.listen(port, () => {console.log(port)});

/*
	res.writeHead(301,{'Location': 'http://localhost:8000/'});
	res.end();
*/