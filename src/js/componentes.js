
//Importaciones

import { Todo} from '../classes/';
import { todoList } from '../index';


//Referencias Html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');

export const crearTodoHtml = (todo) => {
     
    const htmlTodo = ` 
     
    <li class="${(todo.completado == false) ? '' : 'completed'}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${(todo.completado == false) ? '' : 'checked'} >
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`;

   const div = document.createElement('div');
   div.innerHTML = htmlTodo;
   divTodoList.append(div.firstElementChild);
                                    
return div.firstElementChild;
}


//Eventos

txtInput.addEventListener('keyup', ( event ) => {

    if(event.keyCode === 13 && txtInput.value.length > 0){
        
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        console.log(todoList);
    }
    
});

divTodoList.addEventListener('click', (event) =>{

    const nombreElemento = event.target.localName; //inpunt , label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
   

    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
        console.log(todoList);
    } 
    else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
        console.log(todoList);
    }
  
});


btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();
    
    for(let i = divTodoList.children.length-1; i>=0; i--){

        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
    
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    console.log(filtro);

    if( !filtro ) return;

    for(const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        console.log(completado);
        
        switch(filtro) {

            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                    console.log(elemento);
                }
                break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                } 
                break;
        }
        /* console.log(elemento); */
    }
   


});