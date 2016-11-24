let remoteServerURL = 'http://devrealms.com:3003';
let remoteBookStoreAPIURL = 'http://devrealms.com:3003/api/books';

class MyController {
	constructor() {
		this.mySimpleHttpClient = new MySimpleHttpClient(remoteBookStoreAPIURL);
		this.attachSearchListener();	
		this.attachAddListener();
		this.fetchBooksFromRemote();
	}

	attachSearchListener() {
		const form = document.querySelector('#search-form');
		form.addEventListener('submit', onSearch, false);
	}

	attachAddListener() {
		const form = document.querySelector('#add-form');
		form.addEventListener('submit', onAdd, false);
	}

	fetchBooksFromRemote() {
		this.mySimpleHttpClient.sendGetRequest((err, res, responseText)=>{
			if (err) {
				console.log("Failed to upload the book, err:", err);
			} else {
				//console.log("responseText:", responseText);
				try {
					var jsonBooks = eval(responseText);
					let books = bookStore.addBooksByJson(jsonBooks);
					this.renderBooks(books);
				} catch(e) {
					console.log("error:", e);
					console.log("response is not a json object.");
					console.log("responseText:", responseText);
				}
			}
		});
	}

	uploadTheBookToRemoteStore(book) {
		this.mySimpleHttpClient.sendPostRequest((err, res, responseText)=>{
			if (err) {
				console.log("Failed to upload the book, err:", err);
			} else {
				
				try {
					let retBook = JSON.parse(responseText);
					book.id = retBook.id;
					console.log("new book id", book.id);
					this.renderBooks(bookStore.data);
				} catch(e) {
					console.log("response is not a json object. e:", e);
					console.log("responseText:", responseText);
				}
			}
		}, book);
	}

	renderBooks(books) {
		const el = document.querySelector('#book-list');
		el.innerHTML = '';
		let index = 0;
		let executor = function(resolve, reject) {
			let book = books[index];
			console.log("Id", book.id, "Book Name:", book.title);
			const li = document.createElement('li');

			const div = document.createElement('div');

			const cover = document.createElement('img');
			if (book.images.large) {
				cover.src = book.images.large;	
			} else if (book.images.medium) {
				cover.src = book.images.medium;	
			} else if (book.images.small) {
				cover.src = book.images.small;				
			} else {
				cover.src = "";	
			}
			console.log("cover.src:", cover.src);
			cover.addEventListener('load', () => {
				resolve(index++);
				if (index < books.length) {
					let p = new Promise(executor);
					p.then();
				}
			});

			cover.addEventListener('error', (e) => {
				console.log("Failed to load image:"+cover.src+", error", e);
				reject(e);
				if (index < books.length) {
					let p = new Promise(executor);
					p.then();
				}
			});					
			div.appendChild(cover);

			const title = document.createElement('h3');
			title.innerHTML = book.title;	
			div.appendChild(title);

			const author = document.createElement('h5');
			author.innerHTML = 'By ' + book.author + '<br>';	
			div.appendChild(author);

			const p = document.createElement('p');
			if (book.description) {
				const description = document.createTextNode(book.description);
				p.appendChild(description);
			}
			div.appendChild(p);
			li.appendChild(div);

			const deleteButton = document.createElement('a');
			deleteButton.href = '#';
			deleteButton.innerHTML = '[del]';
			deleteButton.bookID = book.id;
			deleteButton.addEventListener('click', onDelBook, false);

			if (book.marked) {
				li.classList.add('marked');
			}

			li.appendChild(deleteButton);

			el.appendChild(li);			
		}
		let p = new Promise(executor);
		p.then();
		//books.forEach(this.addBook.bind(null, el));
	}

	addBook(parent, book) {
		console.log("Id", book.id, "Book Name:", book.title);
		const li = document.createElement('li');


		const div = document.createElement('div');

		const cover = document.createElement('img');
		if (book.images.large) {
			cover.src = book.images.large;	
		} else if (book.images.medium) {
			cover.src = book.images.medium;	
		} else if (book.images.small) {
			cover.src = book.images.small;				
		} else {
			cover.src = "";	
		}
		console.log("cover.src:", cover.src);
		div.appendChild(cover);

		const title = document.createElement('h3');
		title.innerHTML = book.title;	
		div.appendChild(title);

		const author = document.createElement('h5');
		author.innerHTML = 'By' + book.author + '<br>';	
		div.appendChild(author);

		const p = document.createElement('p');
		if (book.description) {
			const description = document.createTextNode(book.description);
			p.appendChild(description);
		}
		div.appendChild(p);
		li.appendChild(div);

		const deleteButton = document.createElement('a');
		deleteButton.href = '#';
		deleteButton.innerHTML = '[del]';
		deleteButton.bookID = book.id;
		deleteButton.addEventListener('click', onDelBook, false);

		if (book.marked) {
			li.classList.add('marked');
		}

		li.appendChild(deleteButton);

		parent.appendChild(li);

	}

}

let myContoller = new MyController();

function onSearch(e) {
	e.preventDefault();
	const searchTerm = document
						.querySelector('#search-field')
						.value;
	bookStore.markMatchedBooks(searchTerm);
	myContoller.renderBooks(bookStore.data);
}

function onDelBook(e) {
	bookStore.delBookById(this.bookID);
	myContoller.renderBooks(bookStore.data);
}


function onAdd(e) {
	console.log("onAdd");
	e.preventDefault();
	const title = document
						.querySelector('#add-bookname-field')
						.value;
	const author = document
						.querySelector('#add-bookauthor-field')
						.value;
	const descr = document
						.querySelector('#add-descr-field')
						.value;
	const isbn = document
						.querySelector('#add-isbn-field')
						.value;
	const currency = document
						.querySelector('#add-currency-field')
						.value;
	const amount = document
						.querySelector('#add-amount-field')
						.value;
	const largeCover = document
						.querySelector('#add-large-field')
						.value;
	const mediumCover = document
						.querySelector('#add-medium-field')
						.value;
	const smallCover = document
						.querySelector('#add-small-field')
						.value;
	const numberOfPages = document
						.querySelector('#add-pages-field')
						.value;
	let book = bookStore.addBook(title, author, descr, isbn, currency, amount, smallCover, mediumCover, largeCover, numberOfPages);
	console.log("new book:", JSON.stringify(book));
	myContoller.uploadTheBookToRemoteStore(book);
	myContoller.renderBooks(bookStore.data);
}

