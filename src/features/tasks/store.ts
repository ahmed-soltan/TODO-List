import { Task } from "@/hooks/useList";
import { createSlice } from "@reduxjs/toolkit";

type StateProps = {
  tasks: Task[];
};

const initialState: StateProps = {
  tasks: JSON.parse(localStorage.getItem("tasks") as string),
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state: StateProps, action: { payload: Task }) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    updateTaskStatus: (state: StateProps, action: { payload: number }) => {
      if (state.tasks[action.payload].idle) {
        console.log("Transition from idle to running");
        state.tasks[action.payload].idle = false;
        state.tasks[action.payload].running = true;
        state.tasks[action.payload].completed = false;
      } else if (state.tasks[action.payload].running) {
        console.log("Transition from running to completed");
        state.tasks[action.payload].running = false;
        state.tasks[action.payload].completed = true;
        state.tasks[action.payload].idle = false;
      } else if (state.tasks[action.payload].completed) {
        console.log("Transition from completed to idle");
        state.tasks[action.payload].completed = false;
        state.tasks[action.payload].idle = true;
        state.tasks[action.payload].running = false;
      } else {
        console.log("Setting default state to idle");
        state.tasks[action.payload].idle = true;
        state.tasks[action.payload].running = false;
        state.tasks[action.payload].completed = false;
      }

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state: StateProps, action: { payload: number }) => {
      state.tasks = state.tasks.filter(
        (_: Task, idx: number) => idx !== action.payload
      ); 

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { updateTaskStatus, addTask , deleteTask} = taskSlice.actions;

export default taskSlice.reducer;
