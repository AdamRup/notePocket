const reset = document.getElementById('reset');
const save = document.getElementById('save');
const toMenu = document.getElementById('toMenu')
let getTitle = document.getElementById('noteTitle');
let getText = document.getElementById('note');
let getDate = new Date();

//zdarzenie ,któro wywołuje funkcje addNewNote
if(save){
    save.addEventListener('click', function () {
        addNewNote();
    })
}

//zmienna potrzebna zapisania klucza localstorage jako indexu (pomocne przy wyciągnięciu odpowiedniej notatki)
let noteIndex = localStorage.length;

//funkcja ,która tworzy obiekt newNote i dodaje go do tablicy
function addNewNote() {
    
    //klasa Note która inicjuje notatkę
    let Note = {
        title: getTitle.value,
        text: getText.value,
        date: getDate,
    }
    
    //dodanie obiektu Note do localstorage jako tekst wraz z indeksowanym kluczem
    localStorage.setItem(noteIndex++, JSON.stringify(Note));
}

//wyświetlanie wszystkich stworzonych notatek
    for (let i = 0; i < localStorage.length; i++) {
        const getNote = JSON.parse(localStorage.getItem(i));
        console.log(getNote.title, getNote.text, getNote.date);
    }