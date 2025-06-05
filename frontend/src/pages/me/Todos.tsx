import MeLayout from "../../components/Layout/MeLayout";
import { useGetTodosQuery } from "../../features/todos/todosApi";
import { IoMdOpen } from "react-icons/io";

function Todos() {
  const { data, isLoading, isError } = useGetTodosQuery();

  return (
    <MeLayout isLoading={isLoading} title="IlMotoDiario - Da Fare">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-full h-[calc(100vh-var(--navbar-height))]">
        {!isError && data && data.length > 0 ? (
          data.map((todo, index) => (
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
                  <IoMdOpen className="text-white" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 h-full flex flex-col justify-center items-center">
              <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200 font-inter max-w-2xl px-4">
                {isError
                  ? "Si è verificato un errore"
                  : "Non sono presenti viaggi da fare"}
              </p>
            </div>
          </>
        )}
      </div>
    </MeLayout>
  );
}

export default Todos;
