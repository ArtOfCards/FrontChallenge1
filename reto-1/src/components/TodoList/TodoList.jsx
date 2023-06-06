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
  showAllTodos,
  showActiveTodos,
  showCompletedTodos,
  addTodo,
}) => {
  return (
    <div className="flex flex-col mt-7 rounded-lg overflow-hidden shadow-2xl">
      {listOfLists.map((list) => (
        <div   key={list.id}>
          <h2 className="text-zinc-950  bg-cyan-300">{list.title}</h2>
          <TodoInput idList = {list.id} addTodoList={addTodo} /> <br></br>
          {list.todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              handleSetComplete={handleSetComplete}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      ))}
      <TodoFilters
        activeFilter={activeFilter}
        total={3}
        showAllTodos={showAllTodos}
        showActiveTodos={showActiveTodos}
        showCompletedTodos={showCompletedTodos}
        handleClearComplete={handleClearComplete}
      />
    </div> 
  );
};

export { TodoList };
