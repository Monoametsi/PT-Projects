//menu functions
let topNav = document.getElementById('topNav');
let home = document.getElementById('home');
let aboutUs = document.getElementById('About-Us');
let aboutUsSect = document.getElementById('aboutUs-cont');
let service = document.getElementById('Service');
let serviceSect = document.getElementById('service-cont');
let projects = document.getElementById('Projects');
let projectsSect = document.getElementById('project-cont');
let contactUs = document.getElementById('Contact-Us');
let contactUsSect = document.getElementById('contactUs-cont');

window.onscroll = function(){
	let y = document.documentElement.scrollTop;
	if(document.documentElement.scrollTop > 20){
		topNav.classList.add('navBgColor');
	}else{
		topNav.classList.remove('navBgColor');
	}
	
	//console.log(`${y}`);
}

//scrollTop function
let scrollTop = document.getElementById('scrollTop');

let line = document.getElementsByClassName('line');

line[0].classList.add('fullLine');

function scroller(){
	let pagePos = 0;
	let scrollTopLoop = setInterval(scrollTopper, 20);
	
	for(i = 0; i < line.length; i++){
		line[i].classList.remove('fullLine');
	}
	
	function scrollTopper(){
		if(document.documentElement.scrollTop === 0){
			clearInterval(scrollTopLoop);
		}else{
			scrollBy(0, pagePos--);
		}
	}
}

scrollTop.onclick = function(){
	scroller();
}

home.onclick = function(event){
	event.preventDefault();
	scroller();
	this.children[0].children[1].classList.add('fullLine');
}

function navToSectScroller(section){
	let sect = section;
	let pagePos = 0;
	let scrollerLooper = setInterval(scroller, 20);
	

	for(i = 0; i < line.length; i++){
		line[i].classList.remove('fullLine');
	}

	function scroller(){
		let y = document.documentElement.scrollTop;
		let x = sect.offsetTop - topNav.clientHeight;
		
		if(y < x){
			
			scrollBy(0, pagePos++);
		}else{
			console.log(`${y} / ${x}`);
			clearInterval(scrollerLooper);
		}
	}
	
	let scrollerUpLooper = setInterval(scrollerUp, 20);
	
	function scrollerUp(){
		let y = document.documentElement.scrollTop;
		let x = sect.offsetTop - topNav.clientHeight;

		if(y > x){
			scrollBy(0, pagePos--);
		}else{
			console.log(`${y} / ${x}`);
			clearInterval(scrollerUpLooper);
		}
	}
}

aboutUs.onclick = function(){
	event.preventDefault();
	console.log(topNav.clientHeight);
	navToSectScroller(aboutUsSect);
	this.children[0].children[1].classList.add('fullLine');
}

service.onclick = function(){
	event.preventDefault();
	navToSectScroller(serviceSect);
	this.children[0].children[1].classList.add('fullLine');
}

projects.onclick = function(){
	event.preventDefault();
	navToSectScroller(projectsSect);
	this.children[0].children[1].classList.add('fullLine');
}

contactUs.onclick = function(){
	event.preventDefault();
	navToSectScroller(contactUsSect);
	this.children[0].children[1].classList.add('fullLine');
}