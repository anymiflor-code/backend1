const express = require("express") //libreria
const app = express() //levantar
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:', request.path);
  console.log('Body:', request.body);
  console.log('---------------------');
  next()
}

app.use(requestLogger)

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JAvaScript",
        important: false
    },
    {
        id: 3,
        content: "GET & POST are the most important methods of HTTP protocols",
        important: true
    }
]

//pagina principal
/*
app.get('/', (request, response) => {
    response.send('<h1>API REST FROM Notes</h1>')
})
    */

//lista todas las notas
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

//Obtener una nota especifica
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(x => x.id === id)
    //response.json(note)
    if (note){
        response.json(note)
    }
    else {
        response.status(404).end()
    }
})

//Eliminar una nota
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(x => x.id !== id)//solo estamos simulando el borrado
    //console.log('Delete', id);
    response.status(204).end()
})

//Crear una nueva nota
app.post('/api/notes', (request, response) =>{
    const note = request.body
    if (note.content){
    note.id = notes.length+1
    notes = notes.concat(note)
    response.json(note)
    }
    else{
        response.status(400).json({error: 'content is missinsg'})
    }
})

const badPath = (request, response, next) => {
    response.status(404).send({error: 'Ruta desconocida'})
}
app.use(badPath)

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server runing in port ${PORT}`)
})
