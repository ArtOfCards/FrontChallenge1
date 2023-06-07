import {
  FilterButton,
  FilterButtonContainer,
  FiltersContainer,
  ItemsLeft,
} from "./Filter.components";

const TodoFilters = ({
  total,
  activeFilter,
  showAllTodos,
  showActiveTodos,
  showCompletedTodos,
  handleClearComplete,
  listId,
}) => {
  return (
    <FiltersContainer>
      <ItemsLeft total={total} />

      <button
        onClick={() => handleClearComplete(listId)}
        className="text-cyan-600 hover:text-white cursor-pointer transition-all duration-300 ease-in-out"
      >
        Clear Completed
      </button>
    </FiltersContainer>
  );
};

export { TodoFilters };
