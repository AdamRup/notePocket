const reset = document.getElementById('reset');
const save = document.getElementById('save');
const toMenu = document.getElementById('toMenu')
let getTitle = document.getElementById('noteTitle');
let getText = document.getElementById('note');
let getDate = new Date();
let noteLocalStorage = [];

//stworzenie klasy Note
let Note = function (title, text, date) {
    this.title = title;
    this.text = text;
    this.date = date;
}

//Metoda przypisująca do klasy Note tytuł i tekst notatki
Note.prototype.saveNote = function () {
    this.text = getText.value;
    this.title = getTitle.value;
    this.date = getDate;
    console.log(this.title + " " + this.text + " " + this.date);
}

//zdarzenie ,któro wywołuje funkcje addNewNote
if(save){
    save.addEventListener('click', function () {
        addNewNote();
    })
}


//funkcja ,która tworzy obiekt newNote i dodaje go do tablicy
function addNewNote() {
    let newNote = new Note(getTitle, getText, getDate);
    newNote.saveNote();
    noteLocalStorage[noteLocalStorage.length] = newNote;
}

//funkcja ,która wyświetla wszystkie stworzone notatki
function showAllNotes(){
    for (let i = 0; i < noteLocalStorage.length; i++) {
        console.log(noteLocalStorage[i].title);
        console.log(noteLocalStorage[i].text);
        console.log(noteLocalStorage[i].date);
    }
}

if(toMenu){
    toMenu.addEventListener('click', function(){
        showAllNotes();
    })    
}

