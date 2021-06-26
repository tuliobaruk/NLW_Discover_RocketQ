export default function Modal(){

    const ModalWrapper = document.querySelector('.modal-wrapper')

    const closeButtons = document.querySelector(".button.close")
    closeButtons.addEventListener('click', close)

    function open(){
        // Atribui a classe active a modal
        ModalWrapper.classList.add("active")
    }
    function close(){
        // Remove a classe active da modal
        ModalWrapper.classList.remove("active")
    }

    return{
        open,
        close
    }
}