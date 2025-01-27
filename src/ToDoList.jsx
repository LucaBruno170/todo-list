import { useEffect, useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newtask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function addTask() {
    if (newtask.trim() !== "") {
      setTasks((t) => [...t, newtask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="flex flex-col items-center bg-black w-full min-h-screen">
      <h1 className="uppercase py-5 font-bebas text-5xl xs:text-6xl sm:text-7xl text-white">
        To-Do List
      </h1>

      <div className="flex xs:w-3/4 sm:w-1/4 justify-center gap-5 sm:gap-14">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newtask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="p-2 sm:p-3 text-xs sm:text-xl xs:max-sm:w-2/3"
        />
        <button
          onClick={addTask}
          className="text-white text-xs sm:text-xl px-6 bg-green-600 hover:bg-green-500 font-bold"
        >
          Add
        </button>
      </div>

      <ol className="xs:max-sm:w-2/3 sm:w-1/3 my-5 sm:my-10">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="text-xs sm:text-xl bg-white flex justify-between gap-5 items-center font-bold sm:p-5 my-2"
          >
            <span className="px-5">{task}</span>
            <div className="sm:flex sm:gap-4">
              <button
                onClick={() => deleteTask(index)}
                className="bg-red-500 p-2 text-white hover:bg-red-400"
              >
                Delete
              </button>
              <button
                onClick={() => moveTaskUp(index)}
                className="border border-gray-400 p-2 hover:opacity-70"
              >
                Up
              </button>
              <button
                onClick={() => moveTaskDown(index)}
                className="border border-gray-400 p-2 hover:opacity-70"
              >
                Down
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
