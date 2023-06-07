import { useState } from "react";

const TodoInput = ({ idList, addTodoList }) => {
  const [title, setTitle] = useState("");

  const handleAddTodo = (e) => {
    if (e.key.toLowerCase() === "enter") {
      addTodoList(idList, title);
      setTitle("");
    }
  };

  return (
    <div className="mt-6 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="border border-gray-500 border-solid p-3 rounded-full"></span>
      </div>
      <input
        className="focus:shadow-lg font-Inter focus:shadow-cyan-400 pl-12 w-full py-4 bg-cyan-50 rounded-xl outline-none transition-all duration-300 ease-in-out"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => handleAddTodo(e)}
        placeholder="What's next..."
      />
    </div>
  );
};

export { TodoInput };
