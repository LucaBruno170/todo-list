import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newtask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
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
  return (
    <div className="flex flex-col items-center bg-black w-full h-screen border border-white">
      <h1 className="uppercase py-5 font-bebas text-7xl text-white">
        To-Do List
      </h1>

      <div className="flex w-1/4 justify-center gap-14">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newtask}
          onChange={handleInputChange}
          className="p-3 text-xl"
        />
        <button
          onClick={addTask}
          className="text-white text-xl border border-white px-6"
        >
          Add
        </button>
      </div>

      <ol className="w-1/3 my-10">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="text-white text-xl border border-white flex justify-between p-5"
          >
            <span>{task}</span>
            <div>
              <button onClick={() => deleteTask(index)}>Delete</button>
              <button onClick={() => moveTaskUp(index)}>Up</button>
              <button onClick={() => moveTaskDown(index)}>Down</button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
