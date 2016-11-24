var assert = require('assert');
var bookStore = require('../bookStore.js');
describe('bookStore test suite', function() {
	let bookName = "BookName1";
	let bookAuthor = "BookAuthor1";
	var book;
	var id;
	before(function() {
	    // runs before all tests in this block
	    book = bookStore.addBook(bookName, bookAuthor);
	    id = book.id;
	});	
	describe('#addBook()', function() {
		it('bookStore.indexCount should equals to the id of the book returned by addBook', function() {
    		assert.equal(book.id, bookStore.indexCount);
    	});
		it('the title of the book returned by addBook should equals to the bookName', function() {
    		assert.equal(book.title, bookName);
    	});  	
		it('the author of the book returned by addBook should equals to the bookAuthor', function() {
    		assert.equal(book.author, bookAuthor);
    	});  	
	});

	describe('#delBookById()', function() {
		it('delReturn should equals true when delBookById', function() {
			let delReturn = bookStore.delBookById(book.id);
    		assert.equal(true, delReturn);
    	});
		it('the bookStore length should equals 2 when delBookById', function() {
   			assert.equal(2, bookStore.data.length);
    	});
		it('delReturn should equals false when twice delBookById', function() {
 			let delReturn = bookStore.delBookById(book.id);
     		assert.equal(false, delReturn);
    		assert.equal(false, delReturn);
    	});  	
	});
});