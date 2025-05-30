import { FaPen, FaClipboardList } from "react-icons/fa";
import TodoList from "./components/TodoList";
import "./CSS/App.css";

function App() {

  return (
    <div className="App">
      <div className="header">
        <div className="logoside">
          <FaPen />
          <h1>What To Do</h1>
          <FaClipboardList />
        </div>
      </div>
      {/* Todoリストのメインコンポーネントを呼び出し */}
      <TodoList />
    </div>
  )
}

export default App
