import { useEffect, useState } from "react";


import { Title, TodoFilters, TodoInput, TodoList , ListInput } from "./components";

function App() {

  
  const getListOfListsFromLocalStorage = () => {
    const storedData = localStorage.getItem('listOfLists');
    return storedData ? JSON.parse(storedData) : [
      {
        id: 1,
        title: "primera lista de prueba",
        todos: [
          {
            id: 1,
            title: "Todo 1",
            completed: true,
            createdAt: new Date().toISOString().slice(0, 16),
          countdown: "",

          },
          {
            id: 2,
            title: "Todo 2",
            completed: false,
            createdAt: new Date().toISOString().slice(0, 16),
          countdown: "",

          },
          {
            id: 3,
            title: "Todo 3",
            completed: false,
            createdAt: new Date().toISOString().slice(0, 16),
            countdown: "",

          },
        ],
      },
    ];
  };
  
  // Obtener los datos iniciales desde el localStorage 
  const [listOfLists, setListOfLists] = useState(getListOfListsFromLocalStorage());
  

  const [activeFilter, setActiveFilter] = useState("all");



  const generateRandomId = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomId = "";
    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
  };
  /* ------------------------------------------------------------------------- */

  const addTodoList = (idList, title) => {
    const newlist = {
      id: generateRandomId(30),
      title,
      todos: [
        {
          id: generateRandomId(24),
          title: "agregue aquí sus todos",
          completed: true,
          createdAt: new Date().toISOString().slice(0, 16),
          countdown: "",

        },
      ],
    };
  
    const updatedListOfLists = [...listOfLists, newlist];
    setListOfLists(updatedListOfLists);
    localStorage.setItem('listOfLists', JSON.stringify(updatedListOfLists));
  };

  /* ---------- nueva funcion de add todo list ---------- */

  const addTodo = (listId, title) => {
    const newTodo = {
      id: generateRandomId(24),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString().slice(0, 16),
      countdown: "",

    };
  
    const updatedListOfLists = listOfLists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          todos: [...list.todos, newTodo],
        };
      }
      return list;
    });
  
    setListOfLists(updatedListOfLists);
    localStorage.setItem('listOfLists', JSON.stringify(updatedListOfLists));
  };

  /* ------------------------------------------------------- */

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
    localStorage.setItem('listOfLists', JSON.stringify(updatedList));
  };
  
  /* ---------------------- ------------------------------------- */
  const handleClearComplete = (listId) => {
    const updatedLists = listOfLists.map(list => {
      if (list.id === listId) {
        const updatedTodos = list.todos.filter(todo => !todo.completed);
        return { ...list, todos: updatedTodos };
      }
      return list;
    });
  
    setListOfLists(updatedLists);
  
    // Actualizar el localStorage solo para la lista modificada
    const updatedLocalStorage = listOfLists.map((list) => {
      if (list.id === listId) {
        return { ...list, todos: updatedLists.find(l => l.id === listId).todos };
      }
      return list;
    });
  
    localStorage.setItem('listOfLists', JSON.stringify(updatedLocalStorage));
  };
  

  /* ------------------------------- ----------------------------- */

  const handleDelete = (id) => {
    const updatedLists = listOfLists.map((list) => {
      const updatedTodos = list.todos.filter((todo) => todo.id !== id);
      return { ...list, todos: updatedTodos };
    });
  
    setListOfLists(updatedLists);
  
    // Actualizar el localStorage eliminando la lista correspondiente
    const updatedLocalStorage = updatedLists.filter((list) => list.id !== id);
    localStorage.setItem('listOfLists', JSON.stringify(updatedLocalStorage));
  };

/* ------------------------------ -------------------------------- */
  const modifyTodo = ( todoId, updatedTitle) => {
    const updatedListOfLists = listOfLists.map((list) => {
        const updatedTodos = list.todos.map((todo) => {
          if (todo.id === todoId) {
            return { ...todo, title: updatedTitle };
          }
          return todo;
        });
        return { ...list, todos: updatedTodos };
      
      return list;
    });

    setListOfLists(updatedListOfLists);
    localStorage.setItem('listOfLists', JSON.stringify(updatedListOfLists));
  };


  const storedListOfLists = JSON.parse(localStorage.getItem('listOfLists'));

  return (
    <div className="bg-cyan-200 min-h-screen font-inter h-full text-cyan-400 flex flex-cols flex-wrap items-center justify-center py-20 px-5 ">
      <div className="container flex flex-col h-100% items-center">
        <Title />
      </div>
      <div className="container flex flex-col max-w-2xl">
        <h1 className=" text-cyan-50  text-2xl font-semibold">Add List</h1 >
        <TodoInput addTodoList={addTodoList} />

        <TodoList
           activeFilter={activeFilter}
           listOfLists={storedListOfLists || listOfLists} 
           handleSetComplete={handleSetComplete}
           handleDelete={handleDelete}
           handleClearComplete={handleClearComplete}
           addTodo={addTodo}
           modifyTodo={modifyTodo}
        /> 
        
      </div>
    </div>
  );
}

export default App;
