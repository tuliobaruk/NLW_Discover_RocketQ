// Importando o modulo modal criado
import Modal from './modal.js'

// Atribuindo a função importada a constante modal
const modal = Modal()

// Alterando conteudo da Modal baseado na categoria escolhida
const modalTitle = document.querySelector(".modal h2")
const modalDescription = document.querySelector(".modal p")
const modalButton = document.querySelector(".buttons button")

// Pegar todos os botões da classe check
const checkButtons = document.querySelectorAll(".actions a.check")
const deleteButtons = document.querySelectorAll(".actions a.delete")

// Adicionar a escuta aos botões check/delete selecionados acima
// O querySelectorAll() está sendo utilizado porque ele vai executar uma querry
// na página e criar uma lista com todos os botões que existem de acordo com o seletor CSS escolhido

// Função que decide oque será exibido na modal dependendo do que foi clicado

function handleClick(event, check = true){
    event.preventDefault()
    const text = check ? "Marcar como lida" : "Excluir"
    const slug = check ? "check" : "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id


    const form = document.querySelector(".modal form")
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)


    modalTitle.innerHTML = `${text} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que você deseja ${text.toLowerCase()} esta pergunta?`
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")
    modalButton.innerHTML = `Sim, ${text}`

    modal.open()
}

checkButtons.forEach(button => {
    button.addEventListener("click", handleClick)})

deleteButtons.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false))})



