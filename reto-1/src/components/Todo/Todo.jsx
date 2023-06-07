import { useState } from "react";

const Todo = ({ todo, handleSetComplete, handleDelete, modifyTodo }) => {
  const { id, title, completed, createdAt } = todo;
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleEditClick = () => {
    setShowInput(true);
    setInputValue(title);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = () => {
    modifyTodo(id, inputValue);

    setShowInput(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-cyan-50 border-b border-solid border-cyan-400">
      <div className="flex items-center">
        {completed ? (
          <div
            onClick={() => handleSetComplete(id)}
            className="bg-cyan-500 p-1 rounded-full cursor-pointer"
          >
            <img
              className="h-4 w-4"
              src="/check-icon.svg"
              alt="Check Icon"
            />
          </div>
        ) : (
          <span
            onClick={() => handleSetComplete(id)}
            className={`border border-gray-500 border-solid p-3 rounded-full cursor-pointer`}
          ></span>
        )}
        <div className="grid grid-rows-2">
          {!showInput ? (
            <p className={"pl-3 " + (completed && "line-through")}>
              {title}
            </p>
          ) : (
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="pl-3"
            />
          )}
          <p className={"pl-3  text-xs "}>{createdAt}</p>
        </div>
      </div>
     <div>
        {!showInput ? (
            <button onClick={handleEditClick} className="text-cyan-500">
            ✏️
            </button>
        ) : (
            <button onClick={handleSaveClick} className="text-cyan-500">
            📖
            </button>
        )}

        <img
            onClick={() => handleDelete(id)}
            className="h-5 w-5 cursor-pointer transition-all duration-300 ease-in"
            src="/close-icon.svg"
            alt="Close Icon"
        />
        </div>
    </div>
  );
};

export { Todo };
