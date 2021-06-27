// Importando o Modulo Express
const express = require("express")
const QuestionController = require("./controllers/QuestionController")
const RoomController = require("./controllers/RoomController")

// Definindo a constante route
const route = express.Router()

// Definindo que quando não especificado na URL
// Será renderizado o arquivo index.ejs que está dentro de views
route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))
route.get('/create-pass', (req,res) => res.render("index", {page: 'create-pass'}))

route.post("/create-room", RoomController.create)
route.get('/room/:room', RoomController.open)
route.post('/enterroom', RoomController.enter)

// Formato que o formulário de dentro da modal deve passar a informação
route.post('/question/create/:room', QuestionController.create)
route.post('/question/:room/:question/:action', QuestionController.index)

// Exportando route
module.exports = route