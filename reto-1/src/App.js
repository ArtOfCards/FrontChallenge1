import { useEffect, useState } from "react";

import { Title, TodoFilters, TodoInput, TodoList } from "./components";

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
          completed: true,
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

      id: 2,
      title: "lista 1",
      todos: [
        {
          id: 1,
          title: "Todo 1",
          completed: true,
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

  const [filteredTodos, setFilteredTodos] = useState(listOfLists[0].todos);


  const generateRandomId = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomId = "";
    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
  };

  const addTodoList = (title) => {
    const lastId = listOfLists.length > 0 ? listOfLists[listOfLists.length - 1].id : 1;

    const newlist = {
      id: lastId + 1,
      title,
      todos:[
        {
          id: 1,
          title: "agregue aquí sus todos",
          completed: true,
        },
      ],
    };

    const updateListOfLists = [...listOfLists]
    updateListOfLists.push(newlist);
    setListOfLists(updateListOfLists);
    console.log(listOfLists);
  };

  /* ---------- nueva funcion de add todo list ---------- */
  
  const addTodo = (title) => {
      
    const newTodoList = {
      id: generateRandomId(24),
      title,
      completed: false,
    };
    const updateListOfLists = [...listOfLists]
    updateListOfLists[0].todos.push(newTodoList);
    setListOfLists(updateListOfLists);
  };

  /*-------------------------------------------------------*/

  const handleSetComplete = (id) => {
    const updatedList = listOfLists.map(list => {
      if (list.todos.some(todo => todo.id === id)) {
        const updatedTodos = list.todos.map(todo => {
          if (todo.id === id) {
            return { ...todo, completed: !todo.completed }
          }
          return todo;
        });
        return { ...list, todos: updatedTodos };
      }
      return list;
    });
  
    setListOfLists(updatedList);
    console.log(updatedList);
  }
  
  const handleClearComplete = () => {
    const updatedLists = listOfLists.map(list => {
      const updatedTodos = list.todos.filter(todo => !todo.completed);
      return { ...list, todos: updatedTodos };
    });
  
    setListOfLists(updatedLists);
  };
  
  const handleDelete = (id) => {
    const updatedLists = listOfLists.map(list => {
      const updatedTodos = list.todos.filter(todo => todo.id !== id);
      return { ...list, todos: updatedTodos };
    });
  
    setListOfLists(updatedLists);
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
        <h3>List 1</h3>

        <TodoInput addTodoList={addTodo} />

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
