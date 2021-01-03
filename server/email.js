const nodeMailer = require('nodemailer');

let transporter = nodeMailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'pt.projects.submission@gmail.com',
		pass: 'MostAmaz1ng'
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

module.exports = {mailDeliverer};