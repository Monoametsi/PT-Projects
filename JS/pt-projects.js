let leftArrow = document.getElementById('left');
let rightArrow = document.getElementById('right');
let slideBox = document.getElementsByClassName('project-box');
let boxPos = 1;

slideBox[boxPos - 1].style.display = 'flex';

function boxSlider(elemntPos, slideImages, anime1, anime2, anime3, anime4){
	
	for(i = 0; i < slideImages.length; i++){
		slideImages[i].classList.add(anime1);
		slideImages[i].classList.remove(anime2, anime3, anime4);

		setTimeout(
			function(){
				for(i = 0; i < slideImages.length; i++){
					slideImages[i].classList.remove(anime1, anime3, anime4);
					slideImages[i].classList.add(anime2);
					slideImages[i].style.display = 'none';
				}
		}, 400);

	}
	
	elemntPos;
	
	if(boxPos > slideImages.length){
		boxPos = 1;
	}else if(boxPos < 1){
		boxPos = slideImages.length;
	}
	
	let fullImageAmount = slideImages.length;
	
	imgNumTracker.innerHTML = `${boxPos}/${fullImageAmount}`;
	
	setTimeout(
		function(){
			slideImages[boxPos - 1].style.display = 'flex';
		}, 
	450);
	
}

leftArrow.onclick = function(){
	boxSlider(boxPos += -1, slideBox, 'slideRight', 'slideIn', 'slideLeft', 'slideOut');
}

rightArrow.onclick = function(){
	boxSlider(boxPos += 1, slideBox, 'slideLeft', 'slideOut', 'slideRight', 'slideIn');
}

//Modal system

let modal = document.getElementById('projectBox-modal');
let modalSlider = document.getElementsByClassName('projectModal-box');
let modalCloser = document.getElementById('close-btn');
let modalLeftArrow = document.getElementById('modal-left');
let modalRightArrow = document.getElementById('modal-right');
let imgNumTracker = document.getElementById('track-num');

function modalSlide(elemntPos, slideImages){
	
	for(i = 0; i < slideImages.length; i++){
		slideImages[i].classList.remove('smooth-out','slideRight', 'slideIn', 'slideLeft', 'slideOut');
		slideImages[i].style.display = 'none';
	}
	
	elemntPos;
	
	if(boxPos > slideImages.length){
		boxPos = 1;
	}else if(boxPos < 1){
		boxPos = slideImages.length;
	}
	
	let fullImageAmount = slideImages.length;
	
	imgNumTracker.innerHTML = `${boxPos}/${fullImageAmount}`;
	
	slideImages[boxPos - 1].style.display = 'flex';
	
}

for(i = 0; i < slideBox.length; i++){
	(function(index){
			slideBox[i].onclick = function(){
			modal.classList.remove('smooth-out');
			modal.style.display = 'flex';
			modalSlide(boxPos = index + 1, modalSlider);
			document.body.style.overflow = 'hidden';
			document.documentElement.style.overflow = 'hidden';
		};
	})(i)
}

modalCloser.onclick = function(){
	modal.classList.add('smooth-out');
	setTimeout(
		function(){
			modal.style.display = 'none';
			document.body.style.overflow = 'auto';
			document.documentElement.style.overflow = 'auto';
		},
	300)
}

window.onclick = function(){
	if(event.target === modal){
	modal.classList.add('smooth-out');
	setTimeout(
		function(){
			modal.style.display = 'none';
			document.body.style.overflow = 'auto';
			document.documentElement.style.overflow = 'auto';
		},
	300);
	}
}

modalLeftArrow.onclick = function(){
	boxSlider(boxPos += -1, modalSlider, 'slideRight', 'slideIn', 'slideLeft', 'slideOut');
}

modalRightArrow.onclick = function(){
	boxSlider(boxPos += 1, modalSlider, 'slideLeft', 'slideOut', 'slideRight', 'slideIn');
}