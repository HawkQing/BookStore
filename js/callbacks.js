

function loadImages(paths, cb) {

	let doneCount = 0;
	const res = [];
	paths.forEach((path, i) => {
		loadImage(path, (err, img) => {
			doneCount++;
			res[i] = err || img;

			if (doneCount === paths.length) {
				cb(null, res);
			}
		});
	});
}

function loadImage(path, cb) {
	const myImage = new Image();
	myImage.src = path;
	myImage.addEventListener('load', () => {
		cb(null, myImage);
	});

	myImage.addEventListener('error', (e) => {
		cb(e);
	});
}