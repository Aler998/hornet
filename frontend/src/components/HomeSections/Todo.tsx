import { useEffect } from "react";
import { useGetTodosQuery } from "../../features/todos/todosApi";
import { useNavigate } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";
import { IoMdOpen } from "react-icons/io";

function TodoContent({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: todos, isLoading, isError, error } = useGetTodosQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError && error && typeof error === "object" && "status" in error) {
      const status = (error as { status: number }).status;
      navigate(`/${status}`);
    }
  }, [isError, error, navigate]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <Scrollbar>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-full h-[calc(100vh-var(--navbar-height))] p-4">
        {todos && todos.length > 0 ? (
          todos.map((todo, index) => (
            <div key={`${index}_Map`}>
              <iframe
                loading="lazy"
                src={todo.link}
                className=""
                width="100%"
                height="500px"
              ></iframe>
              <div className="h-[45px] w-full px-4 flex justify-between items-center bg-[rgb(47,49,47)] text-white">
                <p className="font-inter">Durata: {todo.time}</p>
                <a target="_blank" className="cursor-pointer" href={todo.nav}>
                  <IoMdOpen className="text-white"/>
                </a>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 h-full flex flex-col justify-center items-center">
              <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200 font-inter max-w-2xl px-4">
                Non sono ancora presenti viaggi da fare
              </p>
            </div>
          </>
        )}
      </div>
    </Scrollbar>
  );
}

export default TodoContent;
