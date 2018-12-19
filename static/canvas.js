let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

ctx.lineWidth = 3;
ctx.strokeStyle = 'black';

let drawing = false;

function canvasCoords(event) {
	return {
		x: event.clientX - (canvas.offsetLeft),
		y: (window.scrollY + event.clientY) - (canvas.offsetTop)
	};
}

canvas.onpointerdown = (event) => {
	drawing = true;
	ctx.beginPath();
};

canvas.onpointerup = (event) => {
	drawing = false;
};

canvas.onpointermove = (event) => {
	let pt = canvasCoords(event);
	if(drawing) {

		ctx.lineTo(pt.x, pt.y);
		ctx.stroke();
	}
	else {
		ctx.moveTo(pt.x, pt.y);
	}
};


//general canvas operations
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//form submission
let form = document.querySelector('#frame__form');
form.onsubmit = function (event) {
	event.preventDefault();

	let formData = new FormData(form);

	canvas.toBlob((blob)=>{

		formData.append('image', blob);

		let req = new XMLHttpRequest();
		req.open('POST', form.action);
		req.onload = (event) => {
			if(req.status == 200) {
				console.log(event);
				window.location = req.responseURL;
			} else {
				alert('failed to upload.');
			}
		}

		req.send(formData);
	});
}
