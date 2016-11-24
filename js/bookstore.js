class BookPrice {

	constructor(currency, amount) {
		this.currency = currency;
		this.amount = amount;
	}

	genPriceByJson(jsonPrice) {
		return new BookPrice(jsonPrice['currency'], jsonPrice['amount']);
	}
}

class BookCover {
	constructor(small, medium, large) {
		this.small = small;
		this.medium = medium;
		this.large = large;
	}

	genBookCoverByJson(jsonCover) {
		return new BookCover(jsonCover['small'], jsonCover['small'], jsonCover['large']);
	}


	genEmtpyCover() {
		return new BookCover('','','');
	}
}

class Book {
	constructor(id, 
				title, 
				author, 
				description, 
				isbn, 
				currency, 
				amount, 
				smallCover, 
				mediumCover, 
				largeCover,
				numberOfPages) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.description = description;
		this.isbn = isbn;
		this.price = new BookPrice(currency, amount);
		this.images = new BookCover(smallCover, mediumCover, largeCover);
		this.numberOfPages = numberOfPages;
	}
}

const bookStore = {
	data : [],
	indexCount : 0,
	hasFetchedBooksFromRemote: false,

	addBook: function(	title, 
					  	author, 
					  	description, 
						isbn, 
						currency, 
						amount, 
						smallCover, 
						mediumCover, 
						largeCover,
						numberOfPages) {
		this.indexCount++;
		let book = new Book(this.indexCount,
							title, 
						  	author, 
						  	description, 
							isbn, 
							currency, 
							amount, 
							smallCover, 
							mediumCover, 
							largeCover,
							numberOfPages);

		this.data.push(book);
		return book;
	},

	addBooksByJson: function(jsonBooks) {
		jsonBooks.forEach(this.genBookByJson);
		return this.data;
	},

	genBookByJson(jsonBook) {
		this.indexCount++;
		let book = new Book(jsonBook['id'], 
						jsonBook['title'], 
						jsonBook['author'], 
						jsonBook['description'], 
						jsonBook['isbn'], 
						jsonBook['price']['currency'], 
						jsonBook['price']['amount'], 
						remoteServerURL + jsonBook['images']['small'], 
						remoteServerURL + jsonBook['images']['medium'], 
						remoteServerURL + jsonBook['images']['large'],
						jsonBook['numberOfPages']);
		bookStore.data.push(book);
		return book;
	},

	delBookById : function(id) {
		let filter =(book, index) => {
			if (book.id == id) {
				return true;
			}
		}

		let index = this.data.findIndex(filter);
		if (index != -1) {
			this.data.splice(index, 1);
			return true;
		}
		return false;
	},

	markMatchedBooks: function(term) {
		this.data.forEach((book) => {
			if (term.length === 0) {
				book.marked = false;
				return false;
			}

			if (book.title.indexOf(term) > -1) {
				book.marked = true;
				return true
			} else {
				book.marked = false;
				return false;
			}
		});
	}

}
//module.exports = bookStore;