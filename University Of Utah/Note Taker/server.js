const express     = require('express');
const path        = require('path');
const fs          = require('fs');
const {v4:uuidv4} = require('uuid');
const PORT        = process.env.PORT || 3001;
const app         = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/',(req,res)=> res.sendFile(path.join(__dirname,'/public/index.html')));
app.get('/notes',(req,res)=> res.sendFile(path.join(__dirname,'/public/notes.html')));
app.get('/api/notes',(req,res)=> res.json(JSON.parse(fs.readFileSync(path.join(__dirname,'/db/db.json'),'utf8'))));
app.post('/api/notes',(req,res)=>{ 
    if(req.body.id == undefined){req.body.id = uuidv4();} // create id property if note doesn't already have one
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname,'/db/db.json'),'utf8'));
    notes.push(req.body);
    fs.writeFileSync(path.join(__dirname,'/db/db.json'),JSON.stringify(notes));
    res.json(notes);
});
app.delete('/api/notes/:id',(req,res)=>{
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname,'/db/db.json'),'utf8'));
    notes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync(path.join(__dirname,'/db/db.json'),JSON.stringify(notes));
    res.json(notes);
});
app.listen(PORT,()=> console.log(`Live on ${PORT}`));
