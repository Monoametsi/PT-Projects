//menu functions
let topNav = document.getElementById('topNav');
let nav = document.getElementById('naver');
let home = document.getElementById('home');
let header = document.getElementById('header');
let aboutUs = document.getElementById('About-Us');
let aboutUsSect = document.getElementById('aboutUs-cont');
let service = document.getElementById('Service');
let serviceSect = document.getElementById('service-cont');
let projects = document.getElementById('Projects');
let projectsSect = document.getElementById('project-cont');
let contactUs = document.getElementById('Contact-Us');
let contactUsSect = document.getElementById('contactUs-cont');

let span = document.getElementById('span');

window.onresize = function(){span.innerHTML = window.innerWidth};

//menu toggle
let menuToggle = document.getElementById('menu-toggle');

function navToggle(menu){
	
	menu.classList.toggle('change');

	if(nav.style.maxHeight){
		nav.style.maxHeight = null;
	}else{
		nav.style.maxHeight = nav.scrollHeight + 'px';
	}
}

menuToggle.onclick = function(){
	navToggle(this);
}

window.onscroll = function(){
	let htmlDocScroll = document.documentElement.scrollTop;
	if(htmlDocScroll > 20){
		topNav.classList.add('navBgColor');
	}else{
		topNav.classList.remove('navBgColor');
	}

	onScrollNavClassAdder(aboutUsSect, aboutUs);
	onScrollNavClassAdder(serviceSect, service);
	onScrollNavClassAdder(projectsSect, projects);
	onScrollNavClassAdder(contactUsSect, contactUs);
}

//scrollTop and navScroll function
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

function navToSectScroller(section,e,thisElemnt){
	e.preventDefault();
	let sect = section;
	let pagePos = 0;
	let scrollerDownLooper = setInterval(scrollerDown, 20);

	for(i = 0; i < line.length; i++){
		line[i].classList.remove('fullLine');
	}
	
	thisElemnt.children[0].children[1].classList.add('fullLine');

	function scrollerDown(){
		let htmlDocScroll = document.documentElement.scrollTop;
		let sectionOffsetTop = sect.offsetTop - topNav.clientHeight;
		
		if(htmlDocScroll < sectionOffsetTop){
			scrollBy(0, pagePos++);
		}else{
			clearInterval(scrollerDownLooper);
		}
	}
	
	let scrollerUpLooper = setInterval(scrollerUp, 20);
	
	function scrollerUp(){
		let htmlDocScroll = document.documentElement.scrollTop;
		let sectionOffsetTop = sect.offsetTop - topNav.clientHeight + 65;

		if(htmlDocScroll > sectionOffsetTop){
			scrollBy(0, pagePos--);
		}else{
			clearInterval(scrollerUpLooper);
		}
	}
}

function onScrollNavClassAdder(section, thisElemnt){
	let sect = section;
	let elemnt = thisElemnt;
	
	elemnt.children[0].children[1].classList.remove('fullLine');
	
	if(document.documentElement.scrollTop < header.clientHeight - topNav.clientHeight){
		home.children[0].children[1].classList.add('fullLine');
	}else{
		home.children[0].children[1].classList.remove('fullLine');
	}

	function scrollerDown(){
		let htmlDocScroll = document.documentElement.scrollTop;
		let sectionOffsetTop = sect.offsetTop - topNav.clientHeight;
		
		if(htmlDocScroll > sectionOffsetTop + sect.clientHeight){
			elemnt.children[0].children[1].classList.remove('fullLine');
		}
	}

	function scrollerUp(){
		let htmlDocScroll = document.documentElement.scrollTop;
		let sectionOffsetTop = sect.offsetTop - topNav.clientHeight;

		if(htmlDocScroll > sectionOffsetTop){
			elemnt.children[0].children[1].classList.add('fullLine');
		}
	}
	
	scrollerUp();
	scrollerDown();
}

aboutUs.onclick = function(){
	navToSectScroller(aboutUsSect, event, this);
}

service.onclick = function(){
	navToSectScroller(serviceSect, event, this);
}

projects.onclick = function(){
	navToSectScroller(projectsSect, event, this);
}

contactUs.onclick = function(){
	navToSectScroller(contactUsSect, event, this);
}