import AddTaskBar from "@/components/AddTaskBar"
import TasksList from "@/components/TasksList"
import { Task } from "@/hooks/useList"
import { useStore } from "@/zustand/store";

const Home = () => {
    // const {tasks} = useList();
    const tasks = useStore((state)=>state.tasks)

    console.log(tasks)
    console.log(tasks)
  return (
    <div className="flex flex-center justify-center flex-col gap-5 max-w-[1280px] m-auto">
        <AddTaskBar/>
        {tasks.length>0 ? tasks.map((task:Task , index:number) =>(
            <TasksList task={task} index={index} key={index}/>

        )):(
            <h1 className="text-center italic text-slate-600 text-sm">Your Haven't Add Any Tasks</h1>
        )}
    </div>
  )
}

export default Home