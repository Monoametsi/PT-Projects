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
	}else{
		nameErr.style.display = 'none';
		nameField.classList.remove('error');
	}
}

/*emailField.oninput = function(){
	emailValidation();
}

function emailValidation(){
	let emailFieldVal = emailField.value;
	let emailErr = document.getElementById('errorEmail-message');
	
	if(nameFieldVal === ''){
		nameErr.style.display = 'flex';
		nameErr.innerHTML = 'Required';
		nameField.classList.add('error');
	}else{
		nameErr.style.display = 'none';
		nameField.classList.remove('error');
	}
}*/

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
	}else{
		msgErr.style.display = 'none';
		msgField.classList.remove('error');
	}
}