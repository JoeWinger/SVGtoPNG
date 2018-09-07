var canvas = document.querySelector("canvas"),
	context = canvas.getContext("2d");
var image = new Image;
var downloadA = document.createElement('a');
var $pngWidth = document.getElementById('pngWidth');
var $pngHeight = document.getElementById('pngHeight')
var lastWidth, lastHeight;

function onUpload() {
	var imgFile = document.getElementById('input').files[0];

	document.getElementById('preview').src = URL.createObjectURL(imgFile);

	image.src = URL.createObjectURL(imgFile);
	image.onload = () => {
		downloadA.download = imgFile.name.replace('svg', 'png');
		$pngWidth.value = image.width;
		$pngHeight.value = image.height;
	};
}

function widthChange() {
	var scale = $pngWidth.value / image.width;
	console.log(`Scale: ${scale}`);
	$pngHeight.value = Math.round(image.height * scale);
}
function heightChange() {
	var scale = $pngHeight.value / image.height;
	console.log(`Scale: ${scale}`);
	$pngWidth.value = Math.round(image.width * scale);
}

function downloadPng() {
	context.canvas.height = $pngHeight.value;
	context.canvas.width = $pngWidth.value;

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(image, 0, 0, canvas.width, canvas.height);

	downloadA.href = canvas.toDataURL('image/png');
	downloadA.click();
}