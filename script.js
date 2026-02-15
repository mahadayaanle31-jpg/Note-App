const addBtn = document.getElementById('addBtn');
const titleInput = document.getElementById('noteTitle');
const textInput = document.getElementById('noteText');
const container = document.getElementById('notesContainer');

// 1. Marka bogga la furo, soo saar xogta horay u kaydsanayd
document.addEventListener('DOMContentLoaded', getNotes);

addBtn.addEventListener('click', () => {
    if (titleInput.value === '' || textInput.value === '') {
        alert("Fadlan buuxi meelaha banaan!");
        return;
    }

    const noteObj = {
        title: titleInput.value,
        text: textInput.value,
        id: Date.now() // Waxaan u siinaynaa ID gaar ah si aan u tirtirno hadhow
    };

    createNoteElement(noteObj);
    saveNoteToLocal(noteObj);

    titleInput.value = '';
    textInput.value = '';
});

// 2. Shaqada dhisidda Card-ka qoraalka
function createNoteElement(note) {
    const noteCard = document.createElement('div');
    noteCard.classList.add('note-card');
    noteCard.setAttribute('data-id', note.id);

    noteCard.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.text}</p>
        <span class="delete-btn" onclick="removeNote(${note.id}, this)">Tirtir Xusuusta</span>
    `;
    container.prepend(noteCard);
}

// 3. Shaqada Kaydinta (Save to LocalStorage)
function saveNoteToLocal(note) {
    let notes = localStorage.getItem('myNotes') ? JSON.parse(localStorage.getItem('myNotes')) : [];
    notes.push(note);
    localStorage.setItem('myNotes', JSON.stringify(notes));
}

// 4. Shaqada Soo Akhrinta (Get from LocalStorage)
function getNotes() {
    let notes = localStorage.getItem('myNotes') ? JSON.parse(localStorage.getItem('myNotes')) : [];
    notes.forEach(note => createNoteElement(note));
}

// 5. Shaqada Tirtirka (Remove from LocalStorage)
function removeNote(id, element) {
    // Ka saar shaashadda
    element.parentElement.remove();

    // Ka saar LocalStorage
    let notes = JSON.parse(localStorage.getItem('myNotes'));
    const filteredNotes = notes.filter(note => note.id !== id);
    localStorage.setItem('myNotes', JSON.stringify(filteredNotes));
}