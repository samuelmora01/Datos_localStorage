const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const form = document.getElementById('formData');
const todosContainer = document.getElementById('todos');

const photoInput = document.getElementById('photoInput');
const preview = document.getElementById('preview');

openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      preview.style.display = 'block';
      preview.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function createTodoItem(data, index) {
  const todo = document.createElement('div');
  todo.classList.add('todo');

  const todoInfo = document.createElement('div');
  todoInfo.classList.add('todoInfo');
  
  const photo = document.createElement('img');
  photo.src = data.photo;
  photo.alt = data.name;
  photo.style.width = '50px';
  photo.style.height = '50px';
  photo.style.borderRadius = '50%';
  photo.style.marginRight = '10px';

  const infoText = document.createElement('div');
  infoText.innerHTML = `
    <p><strong>Documento:</strong> ${data.doc}</p>
    <p><strong>Nombre:</strong> ${data.name}</p>
    <p><strong>Edad:</strong> ${data.age}</p>
    <p><strong>Ciudad:</strong> ${data.city}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Celular:</strong> ${data.phone}</p>
    <p><strong>Fecha Inicio:</strong> ${data.startDate}</p>
    <p><strong>Acción:</strong> ${data.action}</p>
    <p><strong>Post:</strong> ${data.post}</p>
  `;

  todoInfo.appendChild(photo);
  todoInfo.appendChild(infoText);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.classList.add('button');
  deleteButton.style.backgroundColor = 'black';
  deleteButton.style.marginLeft = '10px';
  deleteButton.addEventListener('click', () => deleteTodo(index));

  todo.appendChild(todoInfo);
  todo.appendChild(deleteButton);
  todosContainer.appendChild(todo);
}

function deleteTodo(index) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todosContainer.innerHTML = '';
  todos.forEach((todo, index) => createTodoItem(todo, index));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    doc: document.getElementById('doc').value,
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
    photo: preview.src || '',
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    startDate: document.getElementById('startDate').value,
    action: document.getElementById('action').value,
    post: document.getElementById('post').value,
  };

  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(data);
  localStorage.setItem('todos', JSON.stringify(todos));

  form.reset();
  preview.style.display = 'none';
  modal.style.display = 'none';

  loadTodos();
});

document.addEventListener('DOMContentLoaded', loadTodos);
