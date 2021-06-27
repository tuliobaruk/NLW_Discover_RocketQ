const { open } = require('sqlite');
const Database = require('../db/config')

module.exports = {
    async create(req,res){
        const db = await Database()
        const pass = req.body.password

    // Gerando o N° da Sala

        let roomId;
        let isRoom = true 

        while (isRoom) {
            // Gerando aleatoriamente o ID da Sala
            for (var i = 0; i < 6; i++){
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString()
            }

            // Verificando se o número já existe

            const roomExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomExistIds.some(roomExistIds => roomExistIds === roomId)
            
            if (! isRoom){
            // Se apos verificar IsRoom retornar False (Porque não existe ainda) os dados serão inseridos no DB
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`)
            }
        }

        await db.close()

        res.redirect(`room/${roomId}`)
    },

    async open(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE sala = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE sala = ${roomId} AND read = 1`)
        let isNoQuestions

        if (questions.length == 0){
            if (questionsRead.length == 0){
                isNoQuestions = true
            }
        }

        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },

    enter (req,res){
        const roomId = req.body.roomId

        res.redirect(`room/${roomId}`)
    }
}