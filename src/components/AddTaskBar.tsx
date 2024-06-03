import { useList } from "@/hooks/useList";
import { useState } from "react";

const AddTaskBar = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const { addTask } = useList();
  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    if(taskTitle===""){
        alert("Please enter a task");
        return;
    }
    const date = new Date();
    const dateString = date.toISOString();
    e.preventDefault();
    const task = {
      title: taskTitle,
      completed: false,
      running: false,
      idle: true,
      date: dateString,
    };
    console.log("Task : ", task);
    addTask(task);
    setTaskTitle("");
  };
  return (
    <form
      onSubmit={handleAddTask}
      className="flex w-full items-center gap-3 flex-wrap md:flex-nowrap"
    >
      <input
        type="search"
        className="w-full py-3 border px-2 text-sm rounded-md"
        placeholder="Type a Task"
        onChange={(e) => setTaskTitle(e.target.value)}
        value={taskTitle}
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md w-full md:w-[100px]"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default AddTaskBar;
