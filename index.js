const express = require("express")
const path = require("path")

const app = new express()
app.use(express.json())
app.use(express.static(path.join(__dirname)))
// To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware 

let notes = []

app.post("/notes",(req,res)=>{
    
    const note = req.body.note
    notes.push(note)
    
    res.json({
        message: "Done!"
    })
    
})

app.get("/notes",(req,res)=>{

    res.json({
        notes
    })
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(3000)