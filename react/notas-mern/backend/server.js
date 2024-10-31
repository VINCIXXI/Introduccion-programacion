const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const Note=require('./data/notes');

const app=express();
const PORT=3001;

//Middleware
app.use(cors());
app.use(bodyParser.json());

//conexion a base de datos
mongoose.connect('mongodb://localhost:27017/notas-mern',{
})
.then(()=>console.log('MongoDB conectado'))
.catch((err)=>console.error('Error al conectar a MongoDB',err));

//obtener todas las notas
app.get('/notas',async (req,res)=>{
    try{
    const notas= await Note.find();
    res.json(notas);
    }catch(error){
        console.error("Error al obtener notas",error);
        res.status(500).send('Error al obtener notas');
    }
});

//agregar una nota
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

//actualizar una nota
app.put('/notas/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        const updatedNota=await Note.findByIdAndUpdate(id, {text:req.body.text});
        if (!updatedNota) return res.status(404).send('nota no encontrada');
        res.json(updatedNota);
    }catch (error){
        console.error("Error al actualizar la nota",error);
        res.status(400).send('ID no valido');
    }
});

//eliminar una nota
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

//iniciar el servidor
app.listen(PORT,()=>{
    console.log(`Server running on port http://localhost:${PORT}`);
});