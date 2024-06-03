import { useEffect, useContext, useState, createContext } from "react";

export type Task = {
  title: string;
  completed: boolean;
  running: boolean;
  idle: boolean;
  date: string;
};

type ListContextType = {
  addTask: (task: Task) => void;
  updateTaskStatus: (index: number) => void;
  deleteTask: (index: number) => void;
  tasks: Task[];
};

export const ListContext = createContext<ListContextType | null>(null);

export const ListContextProvider = (props: any) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const tasksList = localStorage.getItem("tasks");
    if (tasksList) {
      setTasks(JSON.parse(tasksList));
    }
  }, []);

  const addTask = (task: Task) => {
    setTasks((prev: Task[]) => {
      const updatedTaskList = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
      return updatedTaskList;
    });
  };

  const updateTaskStatus = (index: number) => {
    setTasks((prev: Task[]) => {
      const updatedTaskList = [...prev];

      if (updatedTaskList[index].idle) {
        console.log("Transition from idle to running");
        updatedTaskList[index].idle = false;
        updatedTaskList[index].running = true;
        updatedTaskList[index].completed = false;
      } else if (updatedTaskList[index].running) {
        console.log("Transition from running to completed");
        updatedTaskList[index].running = false;
        updatedTaskList[index].completed = true;
        updatedTaskList[index].idle = false;
      } else if (updatedTaskList[index].completed) {
        console.log("Transition from completed to idle");
        updatedTaskList[index].completed = false;
        updatedTaskList[index].idle = true;
        updatedTaskList[index].running = false;
      } else {
        console.log("Setting default state to idle");
        updatedTaskList[index].idle = true;
        updatedTaskList[index].running = false;
        updatedTaskList[index].completed = false;
      }

      localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
      return updatedTaskList;
    });
  };
  const deleteTask = (index: number) => {
    setTasks((prev: Task[]) => {
      const updatedTaskList = prev.filter(
        (_: Task, idx: number) => idx !== index // Change `==` to `!==` to filter out the task with the given index
      );
  
      localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
      return updatedTaskList;
    });
  };
  

  const value = {
    addTask,
    tasks,
    updateTaskStatus,
    deleteTask,
  };

  return <ListContext.Provider value={value} {...props} />;
};

export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList must be used within a ListContextProvider");
  }
  return context;
};
