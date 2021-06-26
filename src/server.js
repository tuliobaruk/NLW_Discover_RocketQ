// Importando modulos
const express = require("express")
const path = require('path')
const route = require("./route")

// Definindo a constante server como express()
const server = express()

// Definindo parametros do express
server.use(express.static("public"))
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

// Configurando midware
server.use(express.urlencoded({extended: true}))

// Utilizando o route.js que criamos após importalo
server.use(route)

// Iniciando servidor NodeJS
server.listen(3000, ()=> console.log("Servidor Rodando"))