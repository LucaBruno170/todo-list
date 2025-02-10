import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newtask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function editTask(index) {
    setEditingTask(index);
    setEditText(tasks[index]);
  }

  function saveTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editText;
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditText("");
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
          className="p-2 sm:p-3 text-xs sm:text-xl xs:max-sm:w-2/3 rounded-sm"
        />
        <button
          onClick={addTask}
          className="text-white text-xs sm:text-xl px-6 bg-green-600 hover:bg-green-500 font-bold rounded-sm"
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
            {editingTask === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="p-2 sm:p-3 text-xs sm:text-xl xs:max-sm:w-full"
              />
            ) : (
              <span className="px-5 max-w-64 break-words">{task}</span>
            )}
            <div className="sm:flex sm:gap-4">
              {editingTask === index ? (
                <button
                  onClick={() => saveTask(index)}
                  className="bg-green-500 p-2 text-white hover:bg-green-400"
                >
                  Guardar
                </button>
              ) : (
                <>
                  <button
                    onClick={() => deleteTask(index)}
                    className="bg-red-500 p-3 rounded-sm text-white hover:bg-red-400"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    onClick={() => editTask(index)}
                    className="border border-gray-400 p-2 hover:opacity-70 rounded-sm"
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    onClick={() => moveTaskUp(index)}
                    className="border border-gray-400 p-2 hover:opacity-70 rounded-sm"
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                  <button
                    onClick={() => moveTaskDown(index)}
                    className="border border-gray-400 p-2 hover:opacity-70 rounded-sm"
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
