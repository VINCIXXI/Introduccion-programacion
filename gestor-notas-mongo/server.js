const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path=require('path');
const Note=require('./data/notes');

const app=express();
const PORT=3000;

mongoose.connect('mongodb://localhost:27017/gestor-notas-mongo',
    {useNewUrlParser:true,
    useUnifiedTopology:true})
    .then(()=>console.log('MongoDB conectado'))
    .catch((err)=>console.error('Error al conectar a MongoDB',err));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));


app.get('/notas',async (req,res)=>{
    try{
    const notas= await Note.find();
    res.json(notas);
    }catch(error){
        console.error("Error al obtener notas",error);
        res.status(500).send('Error al obtener notas');
    }
});

app.post('/notas',async (req,res)=>{
    try{
        const nuevaNota=new Note({text:req.body.text});
        await nuevaNota.save();
        res.status(201).json(nuevaNota);
    } catch (error){
        console.error("Error al agregar la nota",error);
        res.status(400).send('Error al agregar la nota');
    }
});

app.delete('/notas/:id',async (req,res)=>{
    try{
        const nota= await Note.findByIdAndDelete(req.params.id);
        if (!nota){
            return res.status(404).send('nota no encontrada');
        }
        res.status(204).send();
    } catch (error){
        console.error("Error al eliminar la nota",error);
        res.status(404).send('ID no valido');
    }
});

app.listen(PORT,()=>{
    console.log(`Server running on port http://localhost:${PORT}`);
});