import { addTask } from "@/features/tasks/store";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddTaskBar = ({t}:{t:any}) => {
  const [taskTitle, setTaskTitle] = useState("");
  // const { addTask } = useList();
  // const addNewTask = useStore((state)=>state.addTask)
  const dispatch = useDispatch()
  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    if(taskTitle.trim()===""){
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
    dispatch(addTask(task)) // Redux toolkit
    // addNewTask(task);  zustand
    // addTask(task) contextAPI
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
        placeholder={t("placeholder")}
        onChange={(e) => setTaskTitle(e.target.value)}
        value={taskTitle}
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md w-full md:w-[100px]"
        type="submit"
      >
        {t("add")}
      </button>
    </form>
  );
};

export default AddTaskBar;
