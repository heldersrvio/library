let myLibrary = [];
let body = document.querySelector('body');

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${title}, by ${author}, ${pages} pages.` + (read ? " Already read." : "Not read yet.");  
    };
}

function addBookToLibrary(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function render(){
    let library = document.createElement('table');
    library.style.width = "100%";
    library.style.cssText = "margin-right: auto; margin-left: auto; margin-top: 50px; border: 1px solid black;"
    let headerRow = document.createElement('tr');
    ["title", "author", "pages", "read"].forEach( prop => {
        let propHeader = document.createElement('th');
        propHeader.style.cssText = "border: 1px solid black; font-weight: bold; width: 70px;";
        propHeader.textContent = prop[0].toUpperCase() + prop.slice(1);
        headerRow.appendChild(propHeader);
    });
    library.appendChild(headerRow);
    myLibrary.forEach(book => {
        let newRow = document.createElement('tr');
        Object.keys(book).forEach( prop => {
            if (prop != "info"){
                let propValue = document.createElement('td');
                propValue.style.cssText = "border: 1px solid black; text-align: center;"
                propValue.textContent = book[prop];
                newRow.appendChild(propValue);
                library.appendChild(newRow);
            }
        });
    });
    body.appendChild(library);
}

addBookToLibrary();
render();