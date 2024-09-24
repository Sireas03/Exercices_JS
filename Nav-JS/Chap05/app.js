import { TodoList } from "./components/TodoList.js";
import {fetchJSON} from "./functions/api.js";
import {createElement} from "./functions/dom.js";

console.log('Infos')
console.warn('Warning')
console.error('Error')

try {
    //const todos = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const todosInStorage = localStorage.getItem('todos').toString()
    let todos = []
    if (todosInStorage) {
        todos = JSON.parse(todosInStorage)
    }
    const list = new TodoList(todos)
    list.appendTo(document.querySelector('#todolist'))
} catch (e) {
    const alertElement = createElement('div', {
        class: 'alert alert-danger m-2',
        role: 'alert'
    })
    alertElement.innerText = 'Impossible de charger les éléments'
    document.body.prepend(alertElement)
    console.error(e)
}