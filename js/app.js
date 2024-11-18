const registroForm = document.getElementById('registro-form');
const inicioForm = document.getElementById('inicio-form');
const card = document.getElementById('card'); 


const toggleForm = (event) => {
    event.preventDefault(); 


    card.classList.toggle('flip');
};


document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', toggleForm);
});
