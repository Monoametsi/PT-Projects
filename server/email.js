const nodeMailer = require('nodemailer');

let transporter = nodeMailer.createTransport({
	service: 'gmail',
	auth: {
		user: '216026633@student.uj.ac.za',
		pass: '12345678MMose@1'
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

	transporter.sendMail(mailOptions, (err, content) => {
		if(err){
			success = false;
			console.log('no' + '\n' + err);
		}else{
			console.log('yes');
		}
		
		transporter.close();
	});
	
	console.log(success);

	if(success){
		console.log('sent');
		emailSent();
	}else{
		console.log('not sent');
		emailNotSent();
	}
}

module.exports = {mailDeliverer};