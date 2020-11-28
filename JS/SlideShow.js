let leftArrow = document.getElementById('left');
let rightArrow = document.getElementById('right');
let slideBox = document.getElementsByClassName('project-box');
let dots = document.getElementsByClassName('dots');
let boxPos = 1;
let count = 1;

slideBox[boxPos - 1].style.display = 'flex';
dots[boxPos - 1].classList.add('dot-background');

//original slider
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
	
	for(i = 0; i < dots.length; i++){
		dots[i].classList.remove('dot-background');
	}
	
	elemntPos;
	
	if(boxPos > slideImages.length){
		boxPos = 1;
	}else if(boxPos < 1){
		boxPos = slideImages.length;
	}
	
	setTimeout(
		function(){
			slideImages[boxPos - 1].style.display = 'flex';
			dots[boxPos - 1].classList.add('dot-background');
		}, 
	450);
}

//modal slider
function modalSlideShow(elemntPos, slideImages, anime1, anime2, anime3, anime4){
	
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
	
	if(count > slideImages.length){
		count = 1;
	}else if(count < 1){
		count = slideImages.length;
	}
	
	let fullImageAmount = slideImages.length;
	
	imgNumTracker.innerHTML = `${count}/${fullImageAmount}`;
	
	setTimeout(
		function(){
			slideImages[count - 1].style.display = 'flex';
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

//current slider function
function currentSlide(elemntPos, slideImages){
	
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
			currentSlide(count = index + 1, modalSlider);
			document.body.style.overflow = 'hidden';
			document.documentElement.style.overflow = 'hidden';
		};
	})(i);
}

for(i = 0; i < dots.length; i++){
	(function(index){
			dots[i].onclick = function(){
			boxSlider(boxPos = index + 1, slideBox, 'slideLeft', 'slideOut', 'slideRight', 'slideIn');
		};
	})(i);
}

function modalRemover(){
	modal.classList.add('smooth-out');
	setTimeout(
		function(){
			modal.style.display = 'none';
			document.body.style.overflow = 'auto';
			document.documentElement.style.overflow = 'auto';
		},
	300);
}

modalCloser.onclick = function(){
	modalRemover();
}

window.onclick = function(){
	if(event.target === modal){
		modalRemover();
	}
}

modalLeftArrow.onclick = function(){
	modalSlideShow(count += -1, modalSlider, 'slideRight', 'slideIn', 'slideLeft', 'slideOut');
}

modalRightArrow.onclick = function(){
	modalSlideShow(count += 1, modalSlider, 'slideLeft', 'slideOut', 'slideRight', 'slideIn');
}