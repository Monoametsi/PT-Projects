const nodeMailer = require('nodemailer');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
	path:path.join(__dirname, '.env')
});

const CLIENT_ID = process.env.CLIENT_ID.toString();
const CLIENT_SECRET = process.env.CLIENT_SECRET.toString();
const REDIRECT_URL = process.env.REDIRECT_URL.toString();
const REFRESH_TOKEN = process.env.REFRESH_TOKEN.toString();

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

let accessToken = async () => {
	const accessToken = await oAuth2Client.getAccessToken();
	return accessToken;
}

let transporter = nodeMailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: 'pt.projects.submission@gmail.com',
		clientId: CLIENT_ID,
		clientSecret: CLIENT_SECRET,
		refreshToken: REFRESH_TOKEN,
		accessToken: accessToken(),
	}
});


let success = true;

const mailDeliverer = (name, email, message, emailSent, emailNotSent) => {

	let mailOptions = {
		from: email,
		to: '216026633@student.uj.ac.za',
		subject: 'Form submission',
		html: `User Name: ${name} <br><br> User Email: ${email} <br><br> User Messgae: ${message}`
	};

	let sendMailPromise = new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (err, content) => {
			if(err){
				success = false;
				reject('failed');
				console.log('failed' + '\n' + err);
			}else{
				success = true;
				resolve('success');
				console.log('success' + '\n' + content.response);
			}
			transporter.close();
		})
	});

	sendMailPromise.then(() => {
		if(success == true){
			console.log('sent');
			emailSent();
		}
	}).catch(() => {
		if(success == false){
			console.log('not sent');
			emailNotSent();
		}
	});
}

module.exports = { mailDeliverer };