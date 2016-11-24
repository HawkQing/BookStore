

function loadImage(path) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = path;

		img.addEventListener('load', () => {
			resolve(img);
		});

		img.addEventListener('error', (e) => {
			reject(e);
		});
	});
}

const paths = ['hamlet.jpg', 'sorce_stone.jpg', 'timemachine.jpg'];

const promises = paths.map((path) => loadImage('images/' + path));


loadImage('images/hamlet.jpg')
	.then(() => {
		console.log('Image 1 loaded');
		return loadImage('images/sorce_stone.jpg');
	})
	.then(() => {
		console.log('Image 2 loaded');
		return loadImage('images/sorce_stone.jpg');		
	})
	.then(() => {
		console.log('Image 3 loaded');
	})
	.catch(() => {
		// all errors go here
	})

/*
Promise
	.all(promises)
	.then((data) => {
		debugger;
	})
	.catch((e) => {
		console.log('Could not load image');
	});

*/