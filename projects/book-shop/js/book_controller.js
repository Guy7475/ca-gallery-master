'use strict';

function onInit() {
    createBooks();
    renderBooksTable(gBooks);
    saveBooksToStorage();
}

function renderBooksTable() {
    var books = getBooksForDisplay();
    var strHTMLs = books.map(book => {
        return `
        <tr>
        <td class="id">${book.id}</td>
        <td class="title">${book.title}</td>
        <td class="rating">${book.rating}</td>
        <td class="price">$${book.price.toFixed(2)}</td>
        <td class="book-actions">
        <div class="button read-button" onclick="onOpenDetailModal(event, '${book.id}')">Details</div>
        <div class="button update-button" onclick="onUpdatePrice(event, '${book.id}')">Update</div>
        <div class="button delete-button" onclick="onDeleteBook(event, '${book.id}')">Delete</div>
        </td>
        <td ><img class="td-img" src="${book.img}" alt=""></td}
        </tr>
        `;
    });
    var elTable = document.querySelector('.books-data');
    elTable.innerHTML = strHTMLs.join('');

    renderBookCount();
}

function onAddBook() {
    const elTitleInput = document.querySelector('input[name=titleInput]');
    const bookTitle = elTitleInput.value;
    if (bookTitle.length < 1) return alert('Please enter a valid book title');
    const elPriceInput = document.querySelector('input[name=priceInput]');
    const bookPrice = +elPriceInput.value;

    elTitleInput.value = '';
    elPriceInput.value = 'Price'
    addBook(bookTitle, bookPrice);
    renderBooksTable();
    flashMsg(`Title "${bookTitle}" added`);
}

function onSortBy(sortCreteria) {
    gSortBy = sortCreteria;
    sortBy();
    renderBooksTable();
}

function onOpenDetailModal(ev, bookId) {
    const book = getBookByID(bookId);
    var elModal = document.querySelector('.modal');

    elModal.querySelector('h3').innerText = book.title;
    elModal.querySelector('p').innerText = book.desc;
    elModal.querySelector('img').src = book.img;
    elModal.classList.add('open');
    renderRatingButtons(book);
}

function renderRatingButtons(book) {
    console.log(book.id);
    var strHTMLs = `<button class="plus-rating-button" onclick="onChangeRating(1, '${book.id}')">+</button>
    <span>${book.rating}</span>
    <button class="minus-rating-button" onclick="onChangeRating(-1, '${book.id}')">-</button>
    `;
    document.querySelector('.modal h4').innerHTML = strHTMLs;
}

function onChangeRating(changeAmount, bookId) {
    ChangeRating(changeAmount, bookId);
    const book = getBookByID(bookId);
    document.querySelector('h4 span').innerText = book.rating;
    renderBooksTable();
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open');
}

function onUpdatePrice(ev, bookId) {
    var newPrice = +prompt('Please type the current book price');
    if (!newPrice || newPrice < 0) return alert('Please enter a valid book price');
    console.log(`Price for book ${bookId} changed to ${newPrice}`);
    updateBookPrice(bookId, newPrice);
    flashMsg(`Price updated`);
    renderBooksTable();
}

function onDeleteBook(ev, bookId) {
    const isDelete = confirm("Are you sure you want to delete this title?");
    if (isDelete) {
        deleteBook(bookId);
        console.log(`Book ${bookId} removed from storage`);
        flashMsg(`Book deleted`);
        renderBooksTable();
    }
}

function renderBookCount() {
    var elBookCount = document.querySelector('.books-count span');
    elBookCount.innerText = gBooks.length;
}

function onPrevPage() {
    setPrevPage();
    renderBooksTable();
    renderPageNum();
}

function onNextPage() {
    setNextPage();
    renderBooksTable();
    renderPageNum();
}

function renderPageNum() {
    var elPageNum = document.querySelector('.page-num');
    elPageNum.innerText = gPageIdx + 1;
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg');
    el.innerText = msg;
    el.classList.add('open');
    setTimeout(() => {
        el.classList.remove('open');
    }, 3000);
}



// TODO sorting uppercase

