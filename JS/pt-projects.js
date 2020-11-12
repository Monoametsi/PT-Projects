//menu functions
let topNav = document.getElementById('topNav');
let home = document.getElementById('home');
let aboutUs = document.getElementById('About-Us');
let service = document.getElementById('Service');
let projects = document.getElementById('Projects');
let contactUs = document.getElementById('Contact-Us');

function(){
	
}

window.onscroll = function navClassAdder(){
	if(document.documentElement.scrollTop > 20){
		topNav.classList.add('navBgColor');
	}else{
		topNav.classList.remove('navBgColor');
	}
}

//scrollTop function
let scrollTop = document.getElementById('scrollTop');

scrollTop.onclick = function(){
	let pagePos = 0;
	let scrollTopLoop = setInterval(scrollTopper, 20);
	
	function scrollTopper(){
		if(document.documentElement.scrollTop === 0){
			clearInterval(scrollTopLoop);
		}else{
			scrollBy(0, pagePos--);
		}
	}
}