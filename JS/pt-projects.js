let leftArrow = document.getElementById('left');
let rightArrow = document.getElementById('right');
let slideBox = document.getElementsByClassName('project-box');
let boxPos = 1;

slideBox[boxPos - 1].style.display = 'flex';

function boxSlider(elemntPos){
	
	for(i = 0; i < slideBox.length; i++){
		slideBox[i].style.display = 'none';
	}
	
	elemntPos;
	
	if(boxPos > slideBox.length){
		boxPos = 1;
	}else if(boxPos < 1){
		boxPos = slideBox.length;
	}
	
	slideBox[boxPos - 1].style.display = 'flex';
	
}

leftArrow.onclick = function(){
	boxSlider(boxPos += -1);
}

rightArrow.onclick = function(){
	boxSlider(boxPos += 1);
}