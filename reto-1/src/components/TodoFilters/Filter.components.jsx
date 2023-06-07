const FiltersContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-cyan-400 border-b border-solid border-cyan-400">
      {children}
    </div>
  );
};

const ItemsLeft = ({ total }) => {
  return <p className="text-cyan-50 text-sm">{total} items left</p>;
};

const FilterButtonContainer = ({ children }) => {
  return <div className="flex items-center space-x-2">{children}</div>;
};

const FilterButton = ({ action, active, filter }) => {
  return (
    <button
      onClick={action}
      className={
        ` hover:text-white cursor-pointer transition-all duration-300 ease-in-out ` +
        (active.toLowerCase().includes(filter.toLowerCase())
          ? "text-cyan-50"
          : "text-cyan-600")
      }
    >
      {filter}
    </button>
  );
};

export { ItemsLeft, FiltersContainer, FilterButtonContainer, FilterButton };
