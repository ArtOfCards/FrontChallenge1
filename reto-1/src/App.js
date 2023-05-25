import { useEffect, useState } from "react";

import { Title, TodoInput, TodoList } from "./components";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Hacerme una paja",
      completed: false,
    },
    {
      id: 2,
      title: "Terminar el codigo",
      completed: false,
    },
    {
      id: 3,
      title: "bueno... otra paja",
      completed: false,
    },
    {
      id: 4,
      title: "Cancelar el semestre",
      completed: false,
    },
  ]);
  const [listOfLists, setListOfLists] = useState([
    {
      id: 1,
      title: "lista 1",
      todos: [
        {
          id: 1,
          title: "Todo 1",
          completed: false,
        },

        {
          id: 2,
          title: "Todo 2",
          completed: false,
        },

        {
          id: 3,
          title: "Todo 3",
          completed: false,
        },
      ],
    },
  ]);

  const [activeFilter, setActiveFilter] = useState("all");

  const [filteredTodos, setFilteredTodos] = useState(todos);

  const addTodo = (title) => {
    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 1;

    const newTodo = {
      id: lastId + 1,
      title,
      completed: false,
    };

    const todoList = [...todos];
    todoList.push(newTodo);

    setTodos(todoList);
  };

  /* ---------- nueva funcion de add todo list ---------- */

  const addTodoList = (title) => {
    const lastId =
      listOfLists[0].todos.length > 0
        ? listOfLists[0].todos[listOfLists[0].todos.length - 1].id
        : 1;
      
    const newTodoList = {
      id: lastId + 1,
      title,
      completed: false,
    };
    console.log(newTodoList);
    const todoList = listOfLists[0].todos;
    todoList.push(newTodoList);
    setListOfLists(todoList);
    console.log(listOfLists);
  };

  /*-------------------------------------------------------*/

  const handleSetComplete = (id) => {
    const updatedList = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedList);
  };

  const handleClearComplete = () => {
    const updatedList = todos.filter((todo) => !todo.completed);
    setTodos(updatedList);
  };

  const handleDelete = (id) => {
    const updatedList = todos.filter((todo) => todo.id !== id);
    setTodos(updatedList);
  };

  const showAllTodos = () => {
    setActiveFilter("all");
  };

  const showActiveTodos = () => {
    setActiveFilter("active");
  };

  const showCompletedTodos = () => {
    setActiveFilter("completed");
  };

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredTodos(todos);
    } else if (activeFilter === "active") {
      const activeTodos = todos.filter((todo) => todo.completed === false);
      setFilteredTodos(activeTodos);
    } else if (activeFilter === "completed") {
      const completedTodos = todos.filter((todo) => todo.completed === true);
      setFilteredTodos(completedTodos);
    }
  }, [activeFilter, todos]);

  return (
    <div className="bg-cyan-200 min-h-screen font-inter h-full text-cyan-400 flex flex-cols flex-wrap items-center justify-center py-20 px-5 ">
      <div className="container flex flex-col h-100% items-center">
        <Title />
      </div>
      <div className="container flex flex-col max-w-2xl">
        <TodoInput addTodoList={addTodoList} />
        <TodoList
          activeFilter={activeFilter}
          listOfLists={listOfLists}
          showAllTodos={showAllTodos}
          showActiveTodos={showActiveTodos}
          showCompletedTodos={showCompletedTodos}
          handleSetComplete={handleSetComplete}
          handleDelete={handleDelete}
          handleClearComplete={handleClearComplete}
        />
      </div>
    </div>
  );
}

export default App;
