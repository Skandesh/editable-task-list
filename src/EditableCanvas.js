// EditableCanvas.js
import React, { useState, useRef, useEffect } from "react";

const EditableCanvas = () => {
  const initialTaskList = JSON.parse(localStorage.getItem("taskList")) || [];

  const initialCounter =
    initialTaskList.length > 0 ? initialTaskList.length + 1 : 1;
  // State to manage the ordered list of tasks
  const [taskList, setTaskList] = useState(initialTaskList);

  // Counter for generating unique keys
  const [counter, setCounter] = useState(initialCounter);

  const canvasRef = useRef(null);

  const lastClickedRef = useRef(false);

  // Event handler to add a task on canvas click
  const handleCanvasClick = (e) => {
    if (lastClickedRef.current) {
      lastClickedRef.current = false; // Reset the ref

      return;
    }

    const isExistingTask = Array.from(canvasRef.current.childNodes).some(
      (child) => child.contains(e.target)
    );

    if (isExistingTask) {
      return;
    }
    // Prompt the user for task input

    const newTask = prompt("Enter your task:");
    // If the user entered a task, add it to the list of tasks

    if (newTask) {
      // Update state with the new task and its completed status
      setTaskList((prevTaskList) => [
        ...prevTaskList,
        { task: newTask, id: counter, completed: false },
      ]);

      // Increment the counter for the next key
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  // Event handler to toggle the completed status of a task
  const handleTaskClick = (taskId) => {
    console.log("SEcond here");
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    // lastClickedRef.current = canvasRef.current.querySelector(
    //   `[data-taskid="${taskId}"]`
    // );
    lastClickedRef.current = true;
  };

  useEffect(() => {
    canvasRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <div
      ref={canvasRef}
      tabIndex={0}
      style={{
        position: "relative",
        width: "500px", // You can adjust the size as needed
        height: "500px",

        cursor: "text",
      }}
      onClick={(e) => handleCanvasClick(e)}
    >
      {/* Render the added tasks as a list with checkmarks */}
      <ul>
        {taskList.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
              listStyle: "none", // Remove default list styles
            }}
            onClick={() => handleTaskClick(task.id)}
          >
            <span role="img" aria-label="Checkmark">
              {task.completed ? "💕 " : "◻️ "}
            </span>
            {task.task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditableCanvas;
