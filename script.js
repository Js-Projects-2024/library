const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function removeBookFromLibrary(index){
    myLibrary.splice(index, 1);
    displayBooks();
}

function displayBooks(){
    if(myLibrary.length===0) {
        document.getElementById("empty").style.display = "block";
    }
    else{
        document.getElementById("empty").style.display = "none";
    }
    const booksContainer = document.getElementById('booksContainer');
    while(booksContainer.firstChild){
        booksContainer.removeChild(booksContainer.firstChild);
    }
    myLibrary.forEach((book, index)=>{
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        booksContainer.appendChild(bookDiv);

        const title = document.createElement('h2');
        title.textContent = book.title;
        const author = document.createElement('p');
        author.textContent = "Author: " + book.author;
        const pages = document.createElement('p');
        pages.textContent = "Pages: " + book.pages;
        const status = document.createElement('button');
        status.textContent = book.read ? "Read" : "Not read";
        const remove = document.createElement('button');
        remove.textContent = "Remove";

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(status);
        bookDiv.appendChild(remove);

        status.addEventListener("click", ()=>{
            if(status.textContent==="Read") {
                status.textContent = "Not Read";
                book.read = false;
            }
            else{
                status.textContent = "Read";
                book.read = true;                
            }
        });

        remove.addEventListener("click",()=>{
            removeBookFromLibrary(book, index);
        })
    })
}

document.getElementById("submit").addEventListener("click",function(e){
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    document.getElementById('bookForm').reset();
    document.getElementById('bookForm').style.display = 'none';

});

document.getElementById("newBookBtn").addEventListener("click",()=>{
    document.getElementById("bookForm").style.display = "block";
})
