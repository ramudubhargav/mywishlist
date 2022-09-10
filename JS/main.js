const sr = document.querySelector('.todo-input');
const sa = document.querySelector('.todo-btn');
const s = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme')

sa.addEventListener('click', addToDo);
s.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ?
    changeTheme('standard') :
    changeTheme(localStorage.getItem('savedTheme'));

function addToDo(event) {
    event.preventDefault();
    const dsp = document.createElement("div");
    dsp.classList.add('todo', `${savedTheme}-todo`);
    const nsp = document.createElement('li');
    if (sr.value === '') {
        alert("You must write something!");
    } else {
        nsp.innerText = sr.value;
        nsp.classList.add('todo-item');
        dsp.appendChild(nsp);
        savelocal(sr.value);
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn', `${savedTheme}-button`);
        dsp.appendChild(checked);
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn', `${savedTheme}-button`);
        dsp.appendChild(deleted);
        s.appendChild(dsp);
        sr.value = '';
    }
}


function deletecheck(event) {
    const item = event.target;
    if (item.classList[0] === 'delete-btn') {
        item.parentElement.classList.add("fall");
        removeLocalTodos(item.parentElement);
        item.parentElement.addEventListener('transitionend', function() {
            item.parentElement.remove();
        })
    }
    if (item.classList[0] === 'check-btn') {
        item.parentElement.classList.toggle("completed");
    }
}

function savelocal(todo) {
    let sp;
    if (localStorage.getItem('sp') === null) {
        sp = [];
    } else {
        sp = JSON.parse(localStorage.getItem('sp'));
    }

    sp.push(todo);
    localStorage.setItem('sp', JSON.stringify(sp));
}



function getTodos() {
    let sp;
    if (localStorage.getItem('sp') === null) {
        sp = [];
    } else {
        sp = JSON.parse(localStorage.getItem('sp'));
    }

    sp.forEach(function(todo) {
        const dsp = document.createElement("div");
        dsp.classList.add("todo", `${savedTheme}-todo`);
        const nsp = document.createElement('li');
        nsp.innerText = todo;
        nsp.classList.add('todo-item');
        dsp.appendChild(nsp);
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `${savedTheme}-button`);
        dsp.appendChild(checked);
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `${savedTheme}-button`);
        dsp.appendChild(deleted);
        s.appendChild(dsp);
    });
}


function removeLocalTodos(todo) {
    let sp;
    if (localStorage.getItem('sp') === null) {
        sp = [];
    } else {
        sp = JSON.parse(localStorage.getItem('sp'));
    }
    const ps = sp.indexOf(todo.children[0].innerText);
    sp.splice(ps, 1);
    localStorage.setItem('sp', JSON.stringify(sp));
}

function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = localStorage.getItem('savedTheme');
    document.body.className = color;
    color === 'darker' ?
        document.getElementById('title').classList.add('darker-title') :
        document.getElementById('title').classList.remove('darker-title');
    document.querySelector('input').className = `${color}-input`;
    document.querySelectorAll('.todo').forEach(todo => {
        Array.from(todo.classList).some(item => item === 'completed') ?
            todo.className = `todo ${color}-todo completed` :
            todo.className = `todo ${color}-todo`;
    });
    document.querySelectorAll('button').forEach(button => {
        Array.from(button.classList).some(item => {
            if (item === 'check-btn') {
                button.className = `check-btn ${color}-button`;
            } else if (item === 'delete-btn') {
                button.className = `delete-btn ${color}-button`;
            } else if (item === 'todo-btn') {
                button.className = `todo-btn ${color}-button`;
            }
        });
    });
}