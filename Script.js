const inputBox = document.getElementById('input-box');
const addBtn = document.getElementById('add-btn');
const listContainer = document.getElementById('list-container');
const buttons = document.querySelectorAll('.filter-btn');
const emptyMessage = document.getElementById('empty-message');
const tasks = listContainer.getElementsByTagName('li');


inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});


function addTask() {
    if (inputBox.value === '') {
        alert('You must write something!');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
    checkEmpty();
    filterTasks('all');
}

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    }
    if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
        checkEmpty();
    }
});

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data') || '';
    checkEmpty();
}

showTask();

function filterTasks(filter) { 
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === filter) {
            btn.classList.add('active');
        }
    });

    
    const tasks = listContainer.getElementsByTagName('li');
    
    for (let task of tasks) {
        switch (filter) {
            case 'all':
                task.classList.remove('hidden');
                break;
            case 'active':
                
                if (task.classList.contains('checked')) {
                    task.classList.add('hidden');
                } else {
                    task.classList.remove('hidden');
                }
                break;
            case 'completed':
                
                if (task.classList.contains('checked')) {
                    task.classList.remove('hidden');
                } else {
                    task.classList.add('hidden');
                }
                break;
        }
    }
}

function checkEmpty() {
    let activeTasks = 0;
    for (let task of tasks) {
        if (!task.classList.contains('checked')) {
            activeTasks++;
        }
    }

    
    if (tasks.length === 0) {
        emptyMessage.innerHTML = "All caught up! Time to relax. ☕";
        emptyMessage.style.display = 'block';
    } else if (activeTasks === 0) {
        emptyMessage.innerHTML = "Nice work! You've finished everything. 🎉";
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

setInterval(checkEmpty, 100);