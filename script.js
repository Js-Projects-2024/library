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
    // if(myLibrary.length===0) {
    //     document.getElementById("empty").style.display = "block";
    //     document.getElementById("bg").style.display = "block";
    // }
    // else{
    //     document.getElementById("empty").style.display = "none";
    //     document.getElementById("bg").style.display = "none";
    // }
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
        const author = document.createElement('h5');
        author.textContent = "by " + book.author;
        const pages = document.createElement('p');
        pages.textContent =  book.pages + " pages";
        const status = document.createElement('button');
        status.className = "status";
        status.textContent = book.read ? "Read" : "Not read";
        color(status);
        const remove = document.createElement('button');
        remove.className = "remove";
        remove.textContent = "Remove";

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(status);
        bookDiv.appendChild(remove);
        // bookDiv.style.backgroundImage = "url(images/book1.png)";
        // bookDiv.style.backgroundSize = "cover"; 
        // bookDiv.style.backgroundPosition = "center";
        status.addEventListener("click", ()=>{
            if(status.textContent==="Read") {
                status.textContent = "Not Read";
                book.read = false;
                color(status);
            }
            else{
                status.textContent = "Read";
                book.read = true;  
                color(status);           
            }
        });

        remove.addEventListener("click",()=>{
            removeBookFromLibrary(book, index);
        })
    })
}
function color(status){
    if(status.textContent==="Read"){
        status.style.backgroundColor = "#6FBF73";
        status.addEventListener("mouseover",()=>{
            status.style.backgroundColor = "#409648";
        })
        status.addEventListener("mouseout",()=>{
            status.style.backgroundColor = "#6FBF73";
        })
    }
    else{
        status.style.backgroundColor = "#E57373";
        status.addEventListener("mouseover",()=>{
            status.style.backgroundColor = "#af433f";
        })
        status.addEventListener("mouseout",()=>{
            status.style.backgroundColor = "#E57373";
        })
    }
}
document.getElementById("cancel").addEventListener("click",()=>{
    document.getElementById('bookForm').reset();
    document.getElementById('bookForm').style.display = 'none';
    document.getElementById("newBookBtn").style.display = "block";
    document.getElementById('error').textContent="";
});
document.getElementById("submit").addEventListener("click",function(e){
    e.preventDefault();
    const error = document.getElementById('error');
    error.textContent = "";
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;


    if(title.length<1 || author.length<1 || pages.length<1){
        error.textContent = "*All fields are required";
        return;
    }

    if(document.getElementById('pages').value<0) {
        error.textContent = "*Page number shouldn't be negative";
        return;
    }

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    document.getElementById('bookForm').reset();
    document.getElementById('bookForm').style.display = 'none';
    document.getElementById("newBookBtn").style.display = "block";

});

document.getElementById("newBookBtn").addEventListener("click",()=>{
    document.getElementById("bookForm").style.display = "block";
    document.getElementById("newBookBtn").style.display = "none";
})
