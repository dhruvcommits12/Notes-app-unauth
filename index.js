const express = require("express")
const path = require("path")
const jwt = require("jsonwebtoken")

const app = new express()
app.use(express.json())
app.use(express.static(path.join(__dirname)))
// To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware 

let notes = []
let users = []

//AUTHENTICATED ENDPOINT
app.post("/notes",(req,res)=>{
    
    //check if they have sent the right header, extract who the user is from the header

    const token = req.headers.token

    if(!token){

        res.status(403).send({
            message:"You are not logged in"
        })
        return;
    }

    const decoded = jwt.verify(token,"dhruv712")
    const username = decoded.username

    if(!username){
        res.status(401).send({
            message:"Malfunctioned JWT"
        })

        return;
    }

    const note = req.body.note
    notes.push({note,username})

    res.json({
        message: "Done!"
    })
    
})

app.post("/signup",(req,res)=>{

    const username = req.body.username
    const password = req.body.password
    const userExists = users.find(user => user.username === username)
    
    if(userExists){
        return res.status(403).json({
            message:"User with this username already exists"
        })
    }
    users.push({

        username:username,
        password:password
    })

    res.json({
        message:"You have signed up!"
    })

})

app.post("/signin",(req,res)=>{

    const username = req.body.username
    const password = req.body.password
    const userExists = users.find(user => user.username === username && user.password === password)

    if(!userExists){
        return res.status(403).json({
            message:"Incorrect credentials"
        })
    }

    //json web token 
    const token = jwt.sign({
        username:username
    },"dhruv712" //secret
    )

    res.json({
        token:token
    })

})

//AUTHENTICATED ENDPOINT
app.get("/notes",(req,res)=>{

    const token = req.headers.token

    if(!token){

        res.status(403).send({
            message:"You are not logged in"
        })
        return;
    }

    const decoded = jwt.verify(token,"dhruv712")
    const username = decoded.username

    if(!username){
        res.status(401).send({
            message:"Malfunctioned JWT"
        })

        return;
    }

    const userNote = notes.filter(note => note.username === username)

    res.json({
        notes:userNote
    })
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname, "signup.html"))
})

app.get("/signin",(req,res)=>{
    res.sendFile(path.join(__dirname, "signin.html"))
})

app.listen(3000)