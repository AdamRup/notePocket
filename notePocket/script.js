const reset = document.getElementById('reset');
const save = document.getElementById('save');
const toMenu = document.getElementById('toMenu')
let getTitle = document.getElementById('noteTitle');
let getText = document.getElementById('note');
let getColor = document.getElementById("noteColor");
let getDate = new Date();
let formatDate = getDate.getDate() + "-" + getDate.getMonth() + "-" + getDate.getUTCFullYear();

//zdarzenie ,któro wywołuje funkcje addNewNote
if (save) {
    save.addEventListener('click', function () {
        addNewNote();
    })
}

//zmienna potrzebna zapisania klucza localstorage jako indexu (pomocne przy wyciągnięciu odpowiedniej notatki)
let noteIndex = localStorage.length;

//funkcja ,która tworzy obiekt Note
function addNewNote() {
    //klasa Note która inicjuje notatkę
    let Note = {
        title: getTitle.value,
        text: getText.value,
        color: getColor.value,
        date: formatDate,
    }
    //dodanie obiektu Note do localstorage jako tekst wraz z indeksowanym kluczem
    localStorage.setItem(noteIndex++, JSON.stringify(Note));
}

const noteStorageLayOut = document.getElementById("noteStorage-layout");
//wyświetlanie wszystkich stworzonych notatek
for (let i = 0; i < localStorage.length; i++) {
    let getNote = JSON.parse(localStorage.getItem(i));

    //tworzenie indywidualnego diva do każdej wyświetlanej notatki
    const noteView = document.createElement("div");
    const noteViewTitle = document.createElement("div");
    const noteViewText = document.createElement("div");
    const noteViewDate = document.createElement("div");
    const noteViewTitleAndDateHolder = document.createElement("div");
    const noteViewTitleHolder = document.createElement("div");
    const noteViewDateHolder = document.createElement("div");
    const importatntNotesCheckBox = document.createElement("input");
    importatntNotesCheckBox.type = "checkbox";

    //funkcja przypinająca notatkę
    importatntNotesCheckBox.onclick = function(){
        const importantsNotes = document.getElementById("important-notes");
        if (importatntNotesCheckBox.checked == true) {
            importantsNotes.appendChild(noteView);
        }
        else {
            noteStorageLayOut.appendChild(noteView);
        }
    }

    //nadanie id dla noteView
    noteView.id = "noteView";
    noteView.style.background = getNote.color;

    //nadanie id dla noteViewTitleAndDateHolder, który przechowuje w sobie noteViewTitle oraz noteVeiwDate
    noteViewTitleAndDateHolder.id = "noteViewTitleAndDateHolder";

    //nadanie id dla noteViewHoldera
    noteViewTitleHolder.id = "noteViewTitleHolder";

    //nadanie id dla noteViewDateHoldera
    noteViewDateHolder.id = "noteViewDateHolder";

    //nadanie id noteViewTitle
    noteViewTitle.id = "noteViewTitle";
    //wczytanie tytułu notatkiu do noteViewTitle
    noteViewTitle.innerHTML = getNote.title;

    //nadanie id noteViewText
    noteViewText.id = "noteViewText";
    //wczytywanie textu notatki do noteViewText
    noteViewText.innerHTML = getNote.text;

    //nadanie id noteViewDate
    noteViewDate.id = "noteViewDate";
    //wczytanie daty utworzenia notatki do noteViewDate
    noteViewDate.innerHTML = getNote.date;

    noteStorageLayOut.appendChild(noteView);
    noteView.appendChild(noteViewTitleAndDateHolder);
    noteViewTitleHolder.appendChild(noteViewTitle);
    noteViewTitle.appendChild(importatntNotesCheckBox);
    noteViewDateHolder.appendChild(noteViewDate);
    noteViewTitleAndDateHolder.appendChild(noteViewTitleHolder);
    noteViewTitleAndDateHolder.appendChild(noteViewDateHolder);
    noteView.appendChild(noteViewText);
}

