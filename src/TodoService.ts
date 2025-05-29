import TodoTypes from "./todo";

const LOCAL_STORAGE_KEY = 'todos';

const TodoService ={

    // ローカルストレージからToDoリストを取得する
    getTodos: (): TodoTypes[] => {
        const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY)
        return todoStr ? JSON.parse(todoStr) : [];
    },

    // 新しいTodoを追加して保存する
    addTodos: (text:string): TodoTypes => {
        const todos = TodoService.getTodos();
        const newTodo: TodoTypes = {id: todos.length + 1, text, completed: false};
        const updateTodos = [...todos, newTodo];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));

        return newTodo;
    },

    // 指定されたTodoを更新して保存する
    updateTodo: (todo:TodoTypes): TodoTypes => {
        const todos = TodoService.getTodos();
        const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
        return todo;
    },

    // 指定されたIDのTodoを削除する
    deleteTodo: (id:number): void => {
        const todos = TodoService.getTodos();
        
        const updateTodos = todos.filter((todo) => todo.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    }
};

export default TodoService