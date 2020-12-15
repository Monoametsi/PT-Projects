let nameField = document.getElementById('name');
let emailField = document.getElementById('email');
let msgField = document.getElementById('message');
let subBtn = document.getElementById('submit');

nameField.oninput = function(){
	nameValidation();
}

function nameValidation(){
	let nameFieldVal = nameField.value;
	let nameErr = document.getElementById('errorName-message');
	
	if(nameFieldVal === ''){
		nameErr.style.display = 'flex';
		nameErr.innerHTML = 'Required';
		nameField.classList.add('error');
		return false;

	}else{
		nameErr.style.display = 'none';
		nameField.classList.remove('error');
		return true;

	}
}

emailField.oninput = function(){
	emailValidation();
}

function emailValidation(){
	let emailFieldVal = emailField.value;
	let emailErr = document.getElementById('errorEmail-message');
	let emailOneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
	let emailTwoDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailThreeDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	let emailRegEx = emailOneDot.test(emailFieldVal) || emailTwoDots.test(emailFieldVal) || emailThreeDots.test(emailFieldVal);

	if(emailFieldVal === ''){
		emailErr.style.display = 'flex';
		emailErr.innerHTML = 'Required';
		emailField.classList.add('error');
		return false;

	}else if(emailRegEx === false){
		emailErr.style.display = 'flex';
		emailErr.innerHTML = 'Invalid';
		emailField.classList.add('error');
		return false;

	}else{
		emailErr.style.display = 'none';
		emailField.classList.remove('error');
		return true;

	}
}

msgField.oninput = function(){
	msgValidation();
}

function msgValidation(){
	let msgFieldVal = msgField.value;
	let msgErr = document.getElementById('errorTextmsg-message');

	if(msgFieldVal === ''){
		msgErr.style.display = 'flex';
		msgErr.innerHTML = 'Required';
		msgField.classList.add('error');
		return false;

	}else{
		msgErr.style.display = 'none';
		msgField.classList.remove('error');
		return true;

	}
}

subBtn.onclick = function(){

	nameValidation();
	msgValidation();
	emailValidation();

	if(nameValidation() == false){
		nameValidation();
		return false;

	}else if(msgValidation() == false){
		msgValidation();
		return false;

	}else if(emailValidation() == false){
		emailValidation();
		return false;

	}else{
		return true;
	}
}