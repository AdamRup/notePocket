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
        checked: false
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
    importatntNotesCheckBox.onclick = function () {
        const importantsNotes = document.getElementById("important-notes");
        if (importatntNotesCheckBox.checked == true) {
            importantsNotes.appendChild(noteView);
            addChecked(this);
        }
        else {
            noteStorageLayOut.appendChild(noteView);
            removeChecked(this);
        }
    }

    //nadanie id dla noteView
    // noteView.id = "noteView";
    noteView.id = `noteView`;
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

    importatntNotesCheckBox.id = `check_${i}`;

    noteStorageLayOut.appendChild(noteView);
    noteView.appendChild(noteViewTitleAndDateHolder);
    noteViewTitleHolder.appendChild(noteViewTitle);
    noteViewTitle.appendChild(importatntNotesCheckBox);
    noteViewDateHolder.appendChild(noteViewDate);
    noteViewTitleAndDateHolder.appendChild(noteViewTitleHolder);
    noteViewTitleAndDateHolder.appendChild(noteViewDateHolder);
    noteView.appendChild(noteViewText);

    setState(importatntNotesCheckBox);

    move(importatntNotesCheckBox, noteView);
}


function addChecked(element) {
    var chid = element.id.split('_').pop();
    // console.log(chid);
    var json = JSON.parse(localStorage[chid]);
    json.checked = true;
    localStorage.setItem(chid, JSON.stringify(json));
}

function removeChecked(element) {
    var chid = element.id.split('_').pop();
    var json = JSON.parse(localStorage[chid]);
    json.checked = false;
    localStorage.setItem(chid, JSON.stringify(json));
}

function setState(element) {
    var chid = element.id.split('_').pop();
    var json = JSON.parse(localStorage[chid]);
    if (json.checked == true) {
        element.checked = true;
        move(element.offsetParent);
    }
}


function move(checkbox, element) {
    if (checkbox.checked == true) {
        const importantsNotes = document.getElementById("important-notes");
        importantsNotes.appendChild(element);
    }
}