async function addTodos(){

    await axios.post("http://localhost:3000/notes",
        {
            note: document.getElementById("todo").value
        },{
            headers : {
                token : localStorage.getItem("token")
            }
        })
        const newNote = document.createElement("div")
        newNote.innerHTML = document.getElementById("todo").value
        document.getElementById("notes").appendChild(newNote)
        document.getElementById("todo").value=""

}

async function getTodos(){

    const response = await axios.get("http://localhost:3000/notes",{
        headers : {
            token : localStorage.getItem("token")
        }
    })
    const notes = response.data.notes

    document.getElementById("notes").innerHTML=""

    for(let i=0; i<notes.length;i++){
        const note = document.createElement("div")
        note.innerHTML=notes[i].note
        document.getElementById("notes").appendChild(note)
    }
}

getTodos()