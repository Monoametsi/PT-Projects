const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');
const {mailDeliverer} = require('./email');

let HTML = '\\' + 'HTML' + '\\' + 'index.html';
let four = '\\' + 'HTML' + '\\' + '404.html';

let dirname = __dirname.slice(0, __dirname.search('SERVER') - 1);

const server = http.createServer((req,res) => {
	let filePath = path.join(dirname, req.url === '/' ?  HTML : req.url);
	let filePath2 = path.join(dirname, req.url === '/email' ?  four : req.url);
	let notFoundFile = path.join(dirname);

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
		if(err){
			console.log(err);
			if(err.code == 'ENOENT'){
				res.writeHead(404,{'Content-type': 'text/html'});
				res.end('<h1 style="text-align: center; margin-top: 40vh; font-size: 4rem;">404 Not Found</h1>');
			}else{
				res.writeHead(500);
				res.end(`Server error: ${err.code}`);
			}
		}else{
			res.writeHead(200, {'Content-type': contentType});
			res.end(content, 'utf8');
		}
	});

	if(req.url === '/email'){
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
				res.writeHead(200, {'Content-type': contentType});
				res.end('<h1 style="text-align: center; margin-top: 40vh; font-size: 4rem;">Email successfully sent!!!</h1>');
			}
			
			function failure(){
				res.writeHead(200, {'Content-type': contentType});;
				res.end('<h1 style="text-align: center; margin-top: 40vh; font-size: 4rem;">Sorry Email failed to send, please try again!!!</h1>');
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
					res.end('<h1 style="text-align: center; margin-top: 40vh; font-size: 4rem;">Its is a required that all fields be filled in.</h1>');
				}else if(emailRegEx === false){
					res.writeHead(200, {'Content-type': contentType});
					res.end('<h1 style="text-align: center; margin-top: 40vh; font-size: 4rem;">Invalid email</h1>');
				}else{
					mailDeliverer(name, email, message, (err, data) => {
						if(err){
							failure();
						}else{
							success();
						}
					});
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