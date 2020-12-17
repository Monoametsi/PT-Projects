const nodeMailer = require('nodemailer');

let transporter = nodeMailer.createTransport({
	service: 'gmail',
	auth: {
		user: '216026633@student.uj.ac.za',
		pass: '12345678MMose@1'
	}
});

const mailDeliverer = (name,email,message, cb) => {
	let mailOptions = {
		from: email,
		to: '216026633@student.uj.ac.za',
		subject: 'Form submission',
		html: `User Name: ${name} <br><br> User Email: ${email} <br><br> User Messgae: ${message}`
	};

	transporter.sendMail(mailOptions, (err, content) => {
		if(err){
			console.log('no');
			cb(err, null);
		}else{
			console.log('yes');
			cb(null, data);
		}
	});
}

module.exports = {mailDeliverer};