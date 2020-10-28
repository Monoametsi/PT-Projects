let leftArrow = document.getElementById('left');
let rightArrow = document.getElementById('right');
let slideBox = document.getElementsByClassName('project-box');
let boxPos = 1;

slideBox[boxPos - 1].style.display = 'flex';

function boxSlider(elemntPos, anime1, anime2, anime3, anime4){
	
	for(i = 0; i < slideBox.length; i++){
		slideBox[i].classList.add(anime1);
		slideBox[i].classList.remove(anime2, anime3, anime4);

		setTimeout(
			function(){
				for(i = 0; i < slideBox.length; i++){
					slideBox[i].classList.remove(anime1, anime3, anime4);
					slideBox[i].classList.add(anime2);
					slideBox[i].style.display = 'none';
				}
		}, 400);

	}
	
	elemntPos;
	
	if(boxPos > slideBox.length){
		boxPos = 1;
	}else if(boxPos < 1){
		boxPos = slideBox.length;
	}
	
	setTimeout(
		function(){
			slideBox[boxPos - 1].style.display = 'flex';
		}, 
	450);
	
}

leftArrow.onclick = function(){
	boxSlider(boxPos += -1, 'slideRight', 'slideIn', 'slideLeft', 'slideOut');
}

rightArrow.onclick = function(){
	boxSlider(boxPos += 1, 'slideLeft', 'slideOut', 'slideRight', 'slideIn');
}

//Modal system

let modal = document.getElementById('projectBox-modal');
let modalCloser = document.getElementById('close-btn');
let modalLeftArrow = document.getElementById('modal-left');
let modalRightArrow = document.getElementById('modal-right');
let imgNumTracker = document.getElementById("track-num");
let modalImage = document.getElementById('modal-image');
let modalTitle = document.getElementById('modal-title');
let modalDesription = document.getElementById('modal-description');

for(i = 0; i < slideBox.length; i++){
	slideBox[i].onclick = function(){
		modal.classList.remove('smooth-out');
		modal.style.display = 'flex';
		modalImage.children[0].src = this.children[0].children[0].src;
		modalTitle.innerHTML = this.children[1].children[0].innerHTML;
		modalDesription.innerHTML = this.children[2].children[0].innerHTML;
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';
	}
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
	300)
	}
}

/*modalLeftArrow.onclick = function(){
	boxSlider(boxPos += -1);
}

modalRightArrow.onclick = function(){
	boxSlider(boxPos += -1);
}*/