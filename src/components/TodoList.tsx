import { useState } from "react";
import TodoService from "../TodoService";
import { TodoTypes } from "../todo";
import TodoForm from "./TodoForm";
import "../CSS/TodoList.css";
import { FaEdit, FaCheck } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos()); // 初期ロード時に保存済みTodoを取得

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null); // 編集対象のID
  const [editedTodoText, setEditedTodoText] = useState<string>(""); // 編集中のテキスト

  // 対象のTodo情報を状態にセット
  const handleEditStart = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };

  // 編集キャンセル時の処理
  const handleEditCancel = () => {
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  // 編集内容を保存して状態とサービスを更新
  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const updatedTodo = TodoService.updateTodo({
        id,
        text: editedTodoText,
        completed: false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      setEditingTodoId(null);
      setEditedTodoText("");
    }
  };

  // Todo削除
  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todoContainer">
      <div>
        {/* 新規Todo入力フォーム */}
        <TodoForm setTodos={setTodos} />
      </div>
      <div className="todos">
        {todos.map((todo) => (
          <div className="items" key={todo.id}>
            {editingTodoId === todo.id ? (
              <div className="editText">
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  autoFocus={true}
                />
                <button onClick={() => handleEditSave(todo.id)}>
                  <FaCheck />
                </button>
                <button className="cancelBtn" onClick={handleEditCancel}>
                  <GiCancel />
                </button>
              </div>
            ) : (
              <div className="editBtn">
                <span>{todo.text}</span>
                <button onClick={() => handleEditStart(todo.id, todo.text)}>
                  <FaEdit />
                </button>
              </div>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)}>
              <RiDeleteBin5Fill />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;