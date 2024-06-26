import React, { useState, useCallback, useMemo } from "react";
import { Task } from "@/hooks/useList";
import { BiTrash } from "react-icons/bi";
import { RxDotsHorizontal } from "react-icons/rx";
import { TbClockCheck, TbClockEdit, TbClockX } from "react-icons/tb";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteTask, updateTaskStatus } from "@/features/tasks/store";

interface TasksListProps {
  task: Task;
  index: number;
  t:any
}

const TasksList = ({ task, index, t }: TasksListProps) => {
  // const { deleteTask } = useList(); contextAPI
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useDispatch();

  const handleChangeTaskStatus = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isUpdating) return;

      setIsUpdating(true);
      setTimeout(() => {
        dispatch(updateTaskStatus(index));
        setIsUpdating(false);
      }, 500);
    },
    [dispatch, index, isUpdating]
  );

  const taskIcon = useMemo(() => {
    if (task.idle) {
      return (
        <TbClockX
          size={25}
          className="text-orange-500 cursor-pointer"
          onClick={handleChangeTaskStatus}
        />
      );
    } else if (task.running) {
      return (
        <TbClockEdit
          size={25}
          className="text-blue-600 cursor-pointer"
          onClick={handleChangeTaskStatus}
        />
      );
    } else if (task.completed) {
      return (
        <TbClockCheck
          size={25}
          className="text-green-400 cursor-pointer"
          onClick={handleChangeTaskStatus}
        />
      );
    } else {
      return (
        <TbClockX
          size={25}
          className="text-orange-500 cursor-pointer"
          onClick={handleChangeTaskStatus}
        />
      );
    }
  }, [task, handleChangeTaskStatus]);

  const taskOptions = useMemo(
    () => (
      <div className="flex items-start flex-col absolute bottom-[-55px] left-[-100px] shadow-md transition-all z-50 p-2 bg-white border rounded-md w-[100px]">
        <button
          type="button"
          className="py-1 flex items-center w-full"
          onClick={() => dispatch(deleteTask(index))}
        >
          <BiTrash size={20} className="text-rose-400" />
          <p className="text-rose-400 text-xs">{t("delete")}</p>
        </button>
      </div>
    ),
    []
  );

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="w-full p-2 border rounded-md flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          {taskIcon}
          <h1 className="text-sm text-slate-700">{task.title}</h1>
        </div>
        <div className=" flex items-center gap-2">
          <p className="text-xs text-slate-500">
            {moment(task.date).fromNow()}
          </p>
          <RxDotsHorizontal
            className="hover:bg-slate-100 p-1 rounded-md cursor-pointer"
            size={25}
            onClick={() => setOpen(!open)}
          />
          <div className="relative">{open && taskOptions}</div>
        </div>
      </div>
    </div>
  );
};

export default TasksList;
