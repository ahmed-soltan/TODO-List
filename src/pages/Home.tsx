import AddTaskBar from "@/components/AddTaskBar";
import TasksList from "@/components/TasksList";
import { RootState } from "@/features/tasks";
import { Task } from "@/hooks/useList";
import { useSelector } from "react-redux";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import Navbar from "@/components/Navbar";
import cookies from 'js-cookie'
import { useEffect } from "react";
i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locale/{{lng}}/translation.json",
    },
    detection: {
      order: [
        "cookie",
        "htmlTag",
        "localStorage",
        "sessionStorage",
        "navigator",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
  });
const Home = () => {
  // const {tasks} = useList(); contextAPI
  // const tasks = useStore((state) => state.tasks); // zustand
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { t } = useTranslation();
  const lang = cookies.get("i18next") ||"en";

  useEffect(()=>{
    window.document.dir= i18n.dir()
  },[lang])

  return (
    <div className="flex flex-center justify-center flex-col gap-5 max-w-[1280px] m-auto mt-5">
      <Navbar t={t} />
      <AddTaskBar t={t} />
      {tasks.length > 0 ? (
        tasks.map((task: Task, index: number) => (
          <TasksList task={task} index={index} key={index} t={t} />
        ))
      ) : (
        <h1 className="text-center italic text-slate-600 text-sm">
          {t("empty")}
        </h1>
      )}
    </div>
  );
};

export default Home;
