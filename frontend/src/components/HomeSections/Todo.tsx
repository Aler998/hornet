import { useEffect } from "react";
import { useGetTodosQuery } from "../../features/todos/todosApi";
import { useNavigate } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";

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
        {todos?.map((todo, index) => (
          <div key={`${index}_Map`}>
            <iframe loading="lazy" src={todo.link} className="min-h-[500px]" width="100%" height="100%"></iframe>
          </div>
        ))}
      </div>
    </Scrollbar>
  );
}

export default TodoContent;
