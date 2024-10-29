document.getElementById('note-form').onsubmit = async function(e) {
    e.preventDefault();
    const noteInput = document.getElementById('note');
    const noteText = noteInput.value;

    await fetch('/notas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: noteText }),
    });
    noteInput.value = '';
    cargarNotas();
}
async function cargarNotas() {
    const response = await fetch('/notas');
    const notas = await response.json();
    const noteList = document.getElementById('note-list');
    noteList.innerHTML = '';
    notas.forEach((nota,index)=>{
        const li = document.createElement('li');
        li.textContent = nota;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = async ()=>{
            await fetch(`/notas/${index}`, {
                method: 'DELETE',
            });
            cargarNotas();
        };

        li.appendChild(deleteButton);
        noteList.appendChild(li);
    });
}
cargarNotas();