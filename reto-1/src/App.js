import { useEffect, useState } from "react";


import { Title, TodoFilters, TodoInput, TodoList , ListInput } from "./components";

function App() {

    const [todos, setTodos] = useState([
      {
        id: 1,
        title: 'Watch the next Marvel Movie',
        completed: false,
      },
      {
        id: 2,
        title: 'Record the next Video',
       completed: false,
      },
      {
        id: 3,
        title: 'Wash the dishes',
        completed: false,
      },
      {
        id: 4,
        title: 'Study 2 hours',
        completed: false,
      }
    ])
  
  const [listOfLists, setListOfLists] = useState([
    {
      id: 1,
      title: "primera lista de prueba",
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
      title: "lista 2",
      todos: [
        {
          id: 2134,
          title: "Todo 1 de la lista 2",
          completed: true,
        },

        {
          id: 2342356,
          title: "Todo 2 de la lista 2",
          completed: false,
        },

        {
          id: 30912039,
          title: "Todo 3 de la lista 2",
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

  const addTodoList = (idList,title) => {

    const newlist = {
      id: generateRandomId(30),
      title,
      todos:[
        {
          id: generateRandomId(24),
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
  
  const addTodo = (listId, title) => {
    const newTodo = {
      id: generateRandomId(24),
      title,
      completed: false,
    };
  
    const updatedListOfLists = listOfLists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          todos: [...list.todos, newTodo]
        };
      }
      return list;
    });
  
    setListOfLists(updatedListOfLists);
    localStorage.setItem('listOfLists', JSON.stringify(updatedListOfLists));
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
      setFilteredTodos(listOfLists[0].todos);
    } else if (activeFilter === "active") {
      const activeTodos = listOfLists[0].todos.filter((todo) => todo.completed === false);
      setFilteredTodos(activeTodos);
    } else if (activeFilter === "completed") {
      const completedTodos = listOfLists[0].todos.filter((todo) => todo.completed === true);
      setFilteredTodos(completedTodos);
    }
  }, [activeFilter, todos]);

  return (
    <div className="bg-cyan-200 min-h-screen font-inter h-full text-cyan-400 flex flex-cols flex-wrap items-center justify-center py-20 px-5 ">
      <div className="container flex flex-col h-100% items-center">
        <Title />
      </div>
      <div className="container flex flex-col max-w-2xl">
        <h1 className=" text-cyan-50">Add List</h1 >
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
          addTodo={addTodo}
        /> 
        
      </div>
    </div>
  );
}

export default App;
