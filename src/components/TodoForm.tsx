import { Dispatch, SetStateAction, useState } from "react";
import TodoService from "../TodoService";
import { TodoTypes } from "../todo";
import "../CSS/TodoForm.css"

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
}

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  // 「Add Todo」
  const handleAddTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = TodoService.addTodo(newTodoText); // Todoの追加ロジック
      setTodos((prevTodos) => [...prevTodos, newTodo]); // 状態を更新
      setNewTodoText(""); // 入力欄をリセット
    }
  };
  return (
    <div className="inputForm">
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)} // ユーザー入力を状態に反映
        autoFocus={true}
        placeholder="Add a Task"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default TodoForm;