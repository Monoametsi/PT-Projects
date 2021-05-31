const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');
const {mailDeliverer} = require('./email');

const server = http.createServer((req, res) => {
	let HTML = 'HTML' + '//' + 'index.html';
	let successPath = 'contact-us' + '//' + 'success.html';
	let failurePath = 'contact-us' + '//' + 'failure.html';
	let notFound = 'HTML' + '//' + 'notfound.html';

	let dirname = __dirname.slice(0, __dirname.search(/SERVER/i) - 1);
	let filePath = path.join(dirname, req.url === '/' ?  HTML : req.url);
	let filePathSuccess = path.join(dirname, req.url === '/contact-us' ?  successPath : req.url);
	let filePathFailure = path.join(dirname, req.url === '/contact-us' ?  failurePath : req.url);
	let serverErr;

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
				if(err.code == 'ENOENT'){	
					fs.readFile(path.join(dirname, err.code == 'ENOENT' ? notFound : req.url), (err,content) => {
						console.log(req.url);
						res.writeHead(404, {'Content-type': contentType});
						res.end(content, 'utf8');
					});
				}else{
					
					serverErr = `<h1 style="text-align: center; margin-top: 40vh; font-size: 4rem;">Server error: ${ err.code }<br>return to home 
								page by clicking <a href="/">here</a></h1>`
					
					res.writeHead(500);
					res.end(serverErr);
				}
			}else{
				res.writeHead(200, {'Content-type': contentType});
				res.end(content, 'utf8');
			}
		});
	}else if(req.url === '/contact-us'){
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
					if(err){
						if(err.code == 'ENOENT'){
							fs.readFile(path.join(dirname, err.code == 'ENOENT' ? notFound : req.url), (err,content) => {
								res.writeHead(200, {'Content-type': contentType});
								res.end(content, 'utf8');
							});
						}else{
							
						serverErr = `<h1 style="text-align: center; margin-top: 40vh; font-size: 4rem;">Server error: ${ err.code }<br>return to home 
									page by clicking <a href="/">here</a></h1>`
							
							res.writeHead(500);
							res.end(serverErr);
						}
					}else{
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
							
							
							serverErr = `<h1 style="text-align: center; margin-top: 40vh; font-size: 4rem;">Server error: ${ err.code }<br>return to home 
										page by clicking <a href="/">here</a></h1>`
							
							res.writeHead(500);
							res.end(serverErr);
						}
					}else{
						res.writeHead(400, {'Content-type': contentType});;
						res.end(content, 'utf8');
					}
				});
			}

			req.on('end', () => {
				formData = parse(body);
				let { name, email, message } = formData;
				let nameVal = name.trim() === '' || name.trim().length === 0 || name === undefined || name === null;
				let messageVal = message.trim() === '' || message.trim().length === 0 || message === undefined || message === null;
				let emailVal = email.trim() === '' || email.trim().length === 0 || email === undefined || email === null;
				let emailOneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
				let emailTwoDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
				let emailThreeDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
				let emailRegEx = emailOneDot.test(email.trim()) || emailTwoDots.test(email.trim()) || emailThreeDots.test(email.trim());

				if(nameVal || messageVal || emailVal){
					res.writeHead(400, {'Content-type': contentType});
					res.end(`<div style="text-align: center; margin-top: 40vh;">
					<h1 style="text-align: center; font-size: 2rem;">Its is a required that all fields be filled in.</h1>
					<br><br> 
					<h1 style="text-align: center; font-size: 2rem;">Return to home page by clicking <a href="/">here</a></h1>
					</div>`);
				}else if(emailRegEx === false){
					res.writeHead(400, {'Content-type': contentType});
					res.end(`<div style="text-align: center; margin-top: 40vh;">
					<h1 style="text-align: center; font-size: 2rem;">Invalid email</h1>
					<br><br> 
					<h1 style="text-align: center; font-size: 2rem;">Return to home page by clicking <a href="/">here</a></h1>
					</div>`);
				}else{
					mailDeliverer(name.trim(), email.trim(), message.trim(), success, failure);
				}
			});
		}
	}
});

const port = process.env.PORT || 8000;

server.listen(port, () => {console.log(port)});