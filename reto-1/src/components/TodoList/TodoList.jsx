import { Todo } from "../Todo";

import { TodoFilters } from "../TodoFilters";

const TodoList = ({
  listOfLists,
  activeFilter,
  handleSetComplete,
  handleDelete,
  handleClearComplete,
  showAllTodos,
  showActiveTodos,
  showCompletedTodos,
}) => {
  return (
    <div className="flex flex-col mt-7 rounded-lg overflow-hidden shadow-2xl">
      {listOfLists[0].todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          handleSetComplete={handleSetComplete}
          handleDelete={handleDelete}
        />
      ))}
      <TodoFilters
        activeFilter={activeFilter}
        total={listOfLists[0].todos.length}
        showAllTodos={showAllTodos}
        showActiveTodos={showActiveTodos}
        showCompletedTodos={showCompletedTodos}
        handleClearComplete={handleClearComplete}
    />
    </div>
  );
};

export { TodoList };
