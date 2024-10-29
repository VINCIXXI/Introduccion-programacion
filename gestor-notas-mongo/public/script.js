document.getElementById('note-form').onsubmit = async function(e) {
    e.preventDefault();
    const noteInput = document.getElementById('note');
    const noteText = noteInput.value.trim();

    if (!noteText) {
        alert('La nota no puede estar vacía');
        return;
    }

    try {
    await fetch('/notas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: noteText }),
    });
    noteInput.value = '';
    cargarNotas();
    } catch (error) {
        console.error("Error al cargar la nota",error);
    }
}
async function cargarNotas() {
    try {
    const response = await fetch('/notas');
    if (!response.ok) {
        throw new Error('Error al cargar las notas');
    }
    const notas = await response.json();
    const noteList = document.getElementById('note-list');
    noteList.innerHTML = '';

    notas.forEach((nota,index)=>{
        const li = document.createElement('li');
        li.textContent = nota.text;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = async ()=>{
            try{
                await fetch(`/notas/${nota._id}`, {
                    method: 'DELETE',
                });
                cargarNotas();
            }catch(error){
                console.error("Error al eliminar la nota",error);
            }
        };

        li.appendChild(deleteButton);
        noteList.appendChild(li);
    });
    } catch (error) {
        console.error("Error al cargar las notas",error);
    }
}
cargarNotas();