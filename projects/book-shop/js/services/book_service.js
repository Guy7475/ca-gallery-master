'use strict';

const STORAGE_KEY = 'bookDB';
const PAGE_SIZE = 5;

var gBooks;
var gSortBy;
var gSortDirect = 1;
var gPageIdx = 0;

function getBooksForDisplay() {
    var books = gBooks;

    const startIdx = gPageIdx * PAGE_SIZE;
    books = books.slice(startIdx, startIdx + PAGE_SIZE);
    return books;
}

function setNextPage() {
    if ((gPageIdx + 1) * PAGE_SIZE >= gBooks.length) {
        return;
    }
    gPageIdx++;
}

function setPrevPage() {
    if (!gPageIdx) return
    gPageIdx--;
}


function createBooks() {
    gBooks = loadFromStorage(STORAGE_KEY);
    if (!gBooks || !gBooks.length) {
        gBooks = [
            _createBook('Peace and War', 18.90),
            _createBook('Dune', 32.40),
            _createBook('Juslisses', 32.40),
            _createBook('The Expanse', 32.40),
            _createBook('Moon', 32.40),
            _createBook('Undying Merceneries', 32.40),
            _createBook('Footballer', 32.40),
            _createBook('Live Nights', 32.40),
        ];
        saveBooksToStorage();
    }

}

function getBookByID(bookId) {
    return gBooks.find(book => book.id === bookId);
}

function _createBook(title, price) {
    const book = {
        id: makeId(),
        title,
        price,
        desc: makeLorem(),
        rating: 0,
        img: randCover(),
    };
    return book;
}

function addBook(bookTitle, bookPrice) {
    const book = _createBook(bookTitle, bookPrice);
    gBooks.unshift(book);
    saveBooksToStorage();
}

function sortBy() {
    if (gSortBy === 'id' || gSortBy === 'title') {
        // TODO sorting uppercase
        gBooks.sort(function (a, b) {
            if (a[gSortBy] > b[gSortBy]) return (1 * gSortDirect);
            else if (a[gSortBy] < b[gSortBy]) return (-1 * gSortDirect);
            else return 0;
        });
    }
    else if (gSortBy === 'rating' || gSortBy === 'price') {
        gBooks.sort((a, b) => (a[gSortBy] - b[gSortBy]) * gSortDirect);
    }
    gSortDirect *= -1;
    saveBooksToStorage();
}


function updateBookPrice(bookId, newPrice) {
    const idx = gBooks.findIndex(book => book.id === bookId);
    gBooks[idx].price = newPrice;
    saveBooksToStorage();
}

function deleteBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId);
    gBooks.splice(idx, 1);
    saveBooksToStorage();
}

function ChangeRating(changeAmount, bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId);
    gBooks[idx].rating += changeAmount;
    if (gBooks[idx].rating > 10) gBooks[idx].rating = 10
    if (gBooks[idx].rating < 0) gBooks[idx].rating = 0
    saveBooksToStorage();
}

function saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks);
}

