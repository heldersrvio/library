let myLibrary = (localStorage.getItem("myLibrary")) ? JSON.parse(localStorage.getItem("myLibrary")) : [];
let body = document.querySelector('body');
let newAddition = false;

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info(){
        return `${title}, by ${author}, ${pages} pages.` + (read ? " Already read." : "Not read yet.");  
    };
}

function addBookToLibrary(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function clear(){
    while (body.firstChild){
        body.removeChild(body.lastChild);
    }
}

function render(){

    let h1 = document.createElement('h1');
    h1.textContent = "Library";
    body.appendChild(h1);

    let library = document.createElement('table');
    library.style.width = "100%";
    library.style.cssText = "margin-top: 50px; border: 1px solid black;"
    let headerRow = document.createElement('tr');
    ["title", "author", "pages", "read"].forEach( prop => {
        let propHeader = document.createElement('th');
        propHeader.style.cssText = "border: 1px solid black; font-weight: bold; width: 70px;";
        propHeader.textContent = prop.charAt(0).toUpperCase() + prop.slice(1);
        headerRow.appendChild(propHeader);
    });
    library.appendChild(headerRow);
    myLibrary.forEach(book => {
        let newRow = document.createElement('tr');
        Object.keys(book).forEach( prop => {
            if (prop != "info" && prop != "toggleRead"){
                let propValue = document.createElement('td');
                propValue.style.cssText = "border: 1px solid black; text-align: center;"
                propValue.textContent = book[prop];

                if (prop == "read"){
                    newRow.addEventListener('click', e => { book.read = !book.read; localStorage.setItem("myLibrary", JSON.stringify(myLibrary)); clear(); render();});
                }

                newRow.appendChild(propValue);
                library.appendChild(newRow);
            }
        });
    });
    let tablePlusButtons = document.createElement('div');
    tablePlusButtons.classList.add('table-and-buttons');
    tablePlusButtons.appendChild(library);

    let removeButtons = document.createElement('div');
    removeButtons.classList.add('remove-buttons');

    myLibrary.forEach(book => {
        let deleteButton = document.createElement('button');
        deleteButton.textContent = "-";
        deleteButton.addEventListener('click', e => {
            myLibrary = myLibrary.filter((v) => {
                return v.title != book.title;
            });
            clear();
            render();
        })
        removeButtons.appendChild(deleteButton);
    })
    tablePlusButtons.appendChild(removeButtons);
    body.appendChild(tablePlusButtons);

    let newBook = document.createElement('button');
    newBook.classList.add('new-book');
    newBook.textContent = "Add New Book";
    newBook.addEventListener('click', e => {
        if (!newAddition){
            newAddition = true;
            let form = document.createElement('form');
            ["title", "author", "pages"].forEach( prop => {
            let propLabel = document.createElement('label');
            propLabel.setAttribute("for", prop);
            propLabel.textContent = prop.charAt(0).toUpperCase() + prop.slice(1);
            let propInput = document.createElement('input');
            propInput.setAttribute("type", "text");
            if (prop === "pages") {
                propInput.setAttribute("type", "number");
                propInput.setAttribute("min", 1);
            }
            propInput.setAttribute("id", prop);
            propInput.setAttribute("name", prop);
            propInput.required = true;
            form.appendChild(propLabel);
            form.appendChild(propInput);
            });

            let readTrueLabel = document.createElement('label');
            readTrueLabel.setAttribute("for", "true");
            readTrueLabel.textContent = "Already read"
            let readTrueInput = document.createElement('input');
            readTrueInput.setAttribute("type", "checkbox");
            readTrueInput.setAttribute("name", "read");
            readTrueInput.setAttribute("value", "true");
            readTrueInput.setAttribute("id", "read");
            form.appendChild(readTrueLabel);
            form.appendChild(readTrueInput);

            let bottom = document.createElement('div');
            bottom.setAttribute("id", "bottom");
            let submit = document.createElement('button');
            submit.addEventListener('click', e => {
                let title = document.getElementById("title").value;
                let author = document.getElementById("author").value;
                let pages = document.getElementById("pages").value;
                let readTrue = document.getElementById("read").checked;
                console.log(readTrue)
                if (title && author && +pages){
                    addBookToLibrary(title, author, pages, readTrue);
                    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
                    newAddition = false;
                    clear();
                    render();
                } else {
                    let span = document.querySelector("span");
                    if (!document.getElementById("title").checkValidity()) {
                        span.textContent = "Fill the title of the book.";
                    } else if (!document.getElementById("author").checkValidity()) {
                        span.textContent = "Fill the name of the author.";
                    } else if (document.getElementById("pages").validity.valueMissing) {
                        span.textContent = "Fill the number of pages.";
                    } else {
                        span.textContent = "The number of pages is invalid.";
                    }
                }
            });
            submit.textContent = "Done";
            submit.style["margin-top"] = "3px";
            submit.style["margin-bottom"] = "15px";
            bottom.appendChild(submit);

            let errorMessage = document.createElement('span');
            errorMessage.textContent = "";
            bottom.appendChild(errorMessage);
            
            body.appendChild(form);
            body.append(bottom);
        }

    });
    console.log(JSON.stringify(myLibrary));
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    body.appendChild(newBook);
}

render();