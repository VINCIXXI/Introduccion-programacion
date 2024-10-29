const express=require('express');
const bodyParser=require('body-parser');
const fs=require('fs');
const path=require('path');
const app=express();
const PORT=3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

function leerNotas(){
    const data=fs.readFileSync(path.join(__dirname,'data','notas.json'));
    return JSON.parse(data);
}   

function guardarNotas(notas){
    fs.writeFileSync(path.join(__dirname,'data','notas.json'),JSON.stringify(notas, null, 2));
}

app.get('/notas',(req,res)=>{
    const notas=leerNotas();
    res.json(notas);
});

app.post('/notas',(req,res)=>{
    const notas=leerNotas();
    notas.push(req.body.note);
    guardarNotas(notas);
    res.status(201).json(notas);
});

app.delete('/notas/:id',(req,res)=>{
    const notas=leerNotas();
    const index=parseInt(req.params.id);
    if (index>=0 && index<notas.length){
        notas.splice(index,1);
        guardarNotas(notas);
        res.status(204).send();
    }else{
        res.status(404).send('nota no encontrada');
    }
});

app.listen(PORT,()=>{
    console.log(`Server running on port http://localhost:${PORT}`);
});