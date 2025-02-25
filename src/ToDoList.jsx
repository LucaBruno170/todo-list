import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    try {
      const parsedTasks = JSON.parse(storedTasks);
      return Array.isArray(parsedTasks) ? parsedTasks : [];
    } catch {
      return [];
    }
  });

  const [newtask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");
  const inputRef = useRef(null);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function editTask(id) {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) return;
    setEditingTask(id);
    setEditText(taskToEdit.text);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function saveTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: editText } : task
      )
    );
    setEditingTask(null);
    setEditText("");
  }

  function addTask() {
    if (newtask.trim() !== "") {
      const newTaskObject = { id: uuidv4(), text: newtask };
      setTasks((t) => [...t, newTaskObject]);
      setNewTask("");
    }
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function onDragEnd(result) {
    console.log("Drag Result:", result);
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
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

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-full flex justify-center">
          <Droppable droppableId="tasks">
            {(provided) => (
              <ol
                className="xs:max-sm:w-2/3 sm:w-1/3 my-5 sm:my-10"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="text-xs sm:text-xl bg-white flex justify-between gap-5 items-center font-bold sm:p-5 my-2"
                      >
                        {editingTask === task.id ? (
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="p-2 sm:p-3 text-xs sm:text-xl xs:max-sm:w-full"
                            ref={inputRef}
                            onKeyDown={(e) =>
                              e.key === "Enter" && saveTask(task.id)
                            }
                          />
                        ) : (
                          <span className="px-5 max-w-28 xs:max-w-60 sm:max-w-64 break-words">
                            {task.text}
                          </span>
                        )}
                        <div className="sm:flex sm:gap-4">
                          {editingTask === task.id ? (
                            <button
                              onClick={() => saveTask(task.id)}
                              className="bg-green-500 p-2 text-white hover:bg-green-400"
                            >
                              Save
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => deleteTask(task.id)}
                                className="bg-red-500 p-3 rounded-sm text-white hover:bg-red-400"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                              <button
                                onClick={() => editTask(task.id)}
                                className="border border-gray-400 p-3 sm:p-2 hover:opacity-70 rounded-sm"
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </button>
                            </>
                          )}
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ol>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default ToDoList;
