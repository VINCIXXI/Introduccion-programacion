const express=require('express');
const mongoose=require('mongoose');
const BodyParser=require('body-parser');
const cors=require('cors');
const Note=require('./data/notes');

const app=express();
const PORT = 3001;

app.use(cors());
app.use(BodyParser.json());

mongoose.connect('mongodb://0.0.0.0:27017/notas-Final', {
})
.then(() => {
    console.log('Connected to the Database successfully');
})
.catch(err => {
    console.error('Error connecting to the Database', err);
});

app.get('/notas', async (req, res) => {
    try {
        const notas = await Note.find();
        res.json(notas);
    } catch (error) {
        console.error('Error al obtener notas: ',error);
        res.status(500).send('Error al obtener notas');
    }
});

app.post('/notas', async (req, res) => {
    try {
        const nuevaNota = new Note({text: req.body.text});
        await nuevaNota.save();
        res.status(201).json(nuevaNota);
    } catch (error) {
        console.error('Error al agregar nota: ',error);
        res.status(400).send('Error al agregar nota');
    }
});

app.delete('/notas/:id', async (req, res) => {
    try {
        const nota = await Note.findByIdAndDelete(req.params.id);
        if(nota){
            return res.status(404).send('Nota no encontrada');
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar nota: ',error);
        res.status(404).send('Id no valida');
    }
});

app.put('/notas/:id', async (req, res) => {
    try {
        const {id}=req.params;
        const updatedNota=await Note.findByIdAndUpdate(id, {text: req.body.text}, {new: true});
        if(!updatedNota) return res.status(404).send('Nota no encontrada');
            res.json(updatedNota);
    } catch (error) {
        console.error('Error al actualizar nota: ',error);
        res.status(400).send('Id no valida');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});