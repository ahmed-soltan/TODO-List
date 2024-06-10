import { Task } from "@/hooks/useList";
import { create } from "zustand";

type StateType = {
  tasks: Task[];
  addTask: (newTask: Task) => void;
};
export const useStore = create<StateType>((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks") as string),
  addTask: (newTask) =>
    set((state: StateType) => {
      localStorage.setItem("tasks", JSON.stringify([...state.tasks, newTask]));
      return {
        tasks: [...state.tasks, newTask],
      };
    }),
}));
