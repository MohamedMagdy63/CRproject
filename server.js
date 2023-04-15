const express = require('express') 
const  app = express()
const db = require('./Controller/database')

app.use(express.static(__dirname+ '/Front-Pages'))
app.use(express.json())
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'Front-Pages/Index.html');
})
app.post('/',(req,res)=>{
    db.select('*','player').then(()=>{
        db.all().then(()=>{
            res.send(db.data)
        });
    })
})
app.listen(8080,()=>{
    console.log('listening on http://localhost:8080')
})