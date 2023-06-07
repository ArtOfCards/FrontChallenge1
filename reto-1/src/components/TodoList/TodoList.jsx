import React from "react";
import { Todo } from "../Todo";
import { TodoFilters } from "../TodoFilters";
import { TodoInput } from "../TodoInput";

const TodoList = ({
  listOfLists,
  activeFilter,
  handleSetComplete,
  handleDelete,
  handleClearComplete,
  addTodo,
  modifyTodo,
}) => {
  return (
    <div className="flex flex-col mt-7 rounded-lg overflow-hidden shadow-2xl">
      {listOfLists.map((list) => (
        <div   key={list.id}>
          <h2 className="text-zinc-950  bg-cyan-300 text-xl font-semibold">{list.title}</h2>
          <TodoInput idList = {list.id} addTodoList={addTodo} /> <br></br>
          {list.todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              handleSetComplete={handleSetComplete}
              handleDelete={handleDelete}
              createdAt={todo.createdAt}
              modifyTodo={modifyTodo}

            />
          ))}
          <TodoFilters
        activeFilter={activeFilter}
        total={list.todos.length}
        handleClearComplete={handleClearComplete}
        listId = {list.id}
      />
        </div>
        
      ))}
      
    </div> 
  );
};

export { TodoList };
