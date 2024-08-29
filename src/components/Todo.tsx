// components/Todo.tsx
import React, { useState, useEffect } from "react";
import ReasonsView from "./ReasonsView";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  amount: number;
  createdAt: Date;
}

const WEEK = 24 * 60 * 60 * 7 * 1000;
const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [completionCount, setCompletionCount] = useState<number>(0);
  const [first, setfirst] = useState(true);
  const [showWhy, setShowWhy] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedCompletionCount = localStorage.getItem("completionCount");
    const lastResetDate = localStorage.getItem("lastResetDate");

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
      removeExpired(JSON.parse(storedTodos));
    }

    if (storedCompletionCount) {
      setCompletionCount(parseInt(storedCompletionCount, 10));
    }

    setfirst(false);
  }, []);

  const isExpired = (todo: Todo) => {
    const now = new Date();
    console.log(now.getTime() - new Date(todo.createdAt).getTime());
    return now.getTime() - new Date(todo.createdAt).getTime() >= WEEK;
  };

  const removeExpired = (storedTodosItems: Todo[]) => {
    const updatedTodos = storedTodosItems.filter((todo) => !isExpired(todo));
    setTodos(updatedTodos);
  };

  const resetCompleted = () => {
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: false,
    }));
    setTodos(updatedTodos);
  };

  useEffect(() => {
    if (!first) {
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("completionCount", completionCount.toString());
    }
  }, [todos, completionCount]);

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: input,
          completed: false,
          amount: 0,
          createdAt: new Date(),
        },
      ]);
      setInput("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const updateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const toggleCompletion = (id: number) => {
    setTodos(
      todos
        .map((todo) =>
          todo.id === id
            ? {
                ...todo,
                completed: !todo.completed,
                amount: todo.completed ? todo.amount - 1 : todo.amount + 1,
              }
            : todo
        )
        .sort((a, b) => Number(a.completed) - Number(b.completed))
    );
    setCompletionCount((count) => count + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <h2 className="text-xl font-semibold mb-4 ">
        Target : Felling amzing with my teeth and with my self
      </h2>
      <button
        className="bg-blue-500 text-white px-4 py-1 rounded mt-4"
        onClick={() => setShowWhy(true)}
      >
        why
      </button>
      {showWhy && <ReasonsView setShowWhy={setShowWhy} />}
      <p className="mb-4">Tasks completed today: {completionCount}</p>
      <p>
        explain : task are here to be completed in each day and will stay for a
        week{" "}
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-1 rounded mt-4"
        onClick={() => {
          const isConfirmed = window.confirm(
            "Are you sure you want to delete this todo?"
          );
          if (isConfirmed) {
            resetCompleted();
          }
        }}
      >
        reset complete
      </button>
      <div className="mb-4">
        <input
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              addTodo();
            }
          }}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded px-2 py-1 mr-2"
          placeholder="Add a new todo"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-1 rounded mt-4"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="mb-2 flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompletion(todo.id)}
              className="mr-2"
            />
            {editingId === todo.id ? (
              <div className="flex">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border rounded px-2 py-1 mr-2"
                />
                <button
                  onClick={updateTodo}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-2 items-center">
                  <span
                    className={`flex-1 ${todo.completed ? "line-through" : ""}`}
                  >
                    {todo.text}
                  </span>
                  <span>({todo.amount})</span>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={() => startEditing(todo.id, todo.text)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
