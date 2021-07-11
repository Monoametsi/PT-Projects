//menu functions
let topNav = document.getElementById('topNav');
let nav = document.getElementById('naver');
let navLinks = document.getElementsByClassName("nav-link");
let scrollDown = window.pageYOffset;

// let num = document.getElementById('num');

// window.onresize = () => {
	// num.innerHTML = window.innerWidth;
// }

let sections = document.getElementsByTagName('section');

function hideLine(){

	for(i = 0; i < navLinks.length; i++){
		let underLine = navLinks[i];
		underLine.children[1].classList.remove('fullLine');
	}

}

function addLine(){

	for(n = 0; n < navLinks.length; n++){

		let linkName = navLinks[n].children[0].hash;
		let underLine = navLinks[n].children[1];

		for(s = 0; s < sections.length; s++){

			let sectionId = `#${ sections[s].id }`;
			let sectionOffSetTop = sections[s].offsetTop - topNav.scrollHeight;

			if(sectionOffSetTop < 0){
				sectionOffSetTop = 0;
			}

			if(document.documentElement.scrollTop >= sectionOffSetTop){
					
				if(linkName === sectionId){
					hideLine();
					
					underLine.classList.add('fullLine');
				}
	
			}

		}
	}
	
}

addLine();

let bookMarker = function(e) {

	for(i = 0; i < navLinks.length; i++){
		
		navLinks[i].onclick = function(e) {
			e.preventDefault();
			let linkName = this.children[0].hash;

			for(j = 0; j < sections.length; j++){

				let sectionId = `#${ sections[j].id }`;
				let sectionOffSetTop = sections[j].offsetTop - topNav.scrollHeight;

				if(sectionOffSetTop < 0){
					sectionOffSetTop = 0;
				}

				if(linkName === sectionId){

					let count = 0;

					let scrollMover = setInterval(() => {

						if(document.documentElement.scrollTop < sectionOffSetTop){
							scrollBy(0, count++);

							if(document.documentElement.scrollTop >= sectionOffSetTop){
								
								document.documentElement.scrollTop = sectionOffSetTop;
								clearInterval(scrollMover);
							}

						}else{
							scrollBy(0, count--);
							
							if(document.documentElement.scrollTop <= sectionOffSetTop){
	
								document.documentElement.scrollTop = sectionOffSetTop;
								clearInterval(scrollMover);
							}
						}
							
					}, 30);

				}

			}
		}
	}
}

document.body.style.overflow = 'hidden';
document.documentElement.style.overflow = 'hidden';

bookMarker(event);

window.onload = () => {

	let preloader = document.getElementById('preloader-bg-cont');
	
	preloader.classList.add('smooth-out');
	
	setTimeout(() => {
		
		preloader.style.display = 'none';
		document.body.style.overflow = 'auto';
		document.documentElement.style.overflow = 'auto';
		
		
	}, 300);
	
}

function navHider(){
	
	let htmlDocScroll = document.documentElement.scrollTop;

	if(htmlDocScroll > 20){
		topNav.classList.add('navBgColor');

	}else{
		topNav.classList.remove('navBgColor');

	}
	
	let scrollUp = window.pageYOffset;

	// if(scrollDown > scrollUp){
		// topNav.style.top = '0';

	// }else{
		// topNav.style.top = '-' + topNav.scrollHeight + 'px';

	// }
	
	// scrollDown = scrollUp;
}

let htmlDocScroll = document.documentElement.scrollTop;

if(htmlDocScroll > 20){
	topNav.classList.add('navBgColor');

}else{
	topNav.classList.remove('navBgColor');

}

//menu toggle
let menuToggle = document.getElementById('menu-toggle');

function navToggle(menu){

	menu.classList.toggle('change');
	
	if(document.documentElement.scrollTop === 0 || document.body.scrollTop === 0){
		menu.parentElement.parentElement.classList.add('bg-color');
	}else{
		menu.parentElement.parentElement.classList.remove('bg-color');
	}


	if(nav.style.maxHeight){
		nav.style.maxHeight = null;
		menu.parentElement.parentElement.classList.remove('bg-color');
	}else{
		nav.style.maxHeight = nav.scrollHeight + 'px';
	}
}

menuToggle.onclick = function(){
	navToggle(this);
}

// navHider();

window.onscroll = function(){
	navHider();
	addLine();
}

//scrollTop and navScroll function
let scrollTop = document.getElementById('scrollTop');

function scroller(){
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

scrollTop.onclick = function(){
	scroller();
}