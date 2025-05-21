import { Box, Tab, Tabs } from "@mui/material";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../../features/todos/todosApi";
import { DashboardContent } from "../../theme/layouts/dashboard";
import Loader from "../../components/Loader";
import SortableItem from "../../components/todos/SortableItem";
import { useEffect, useState } from "react";
import { Todo } from "../../features/todos/types";
import Swal from "sweetalert2";
import SimpleTabContent from "../../components/todos/SimpleTabContent";
import CreateForm from "../../components/todos/CreateForm";

export default function Index() {
  const { data: todos, isLoading, error, refetch } = useGetTodosQuery();
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [completedTodoList, setCompletedTodoList] = useState<Todo[]>([]);
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const afterDelete = (_id: string) => {
    deleteTodo(_id);
    refetch();
  };

  const afterUpdate = () => {
    refetch();
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    if (todos) {
      setTodoList(todos.filter((todo) => !todo.completed));
      setCompletedTodoList(todos.filter((todo) => todo.completed));
    }
  }, [todos]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTodoList((items) => {
        const oldIndex = items.findIndex((item) => item._id == active.id);
        const newIndex = items.findIndex((item) => item._id == over.id);

        const newList = arrayMove(items, oldIndex, newIndex);

        newList.map((item, index) => {
          updateTodo({
            _id: item._id,
            title: item.title,
            link: item.link,
            order: index,
            completed: false,
          }).then(() => Swal.fire("Ordine modificato"));
        });

        return newList;
      });
    }
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <title>{`Todos`}</title>
      <DashboardContent>
        {error ? (
          <p>Errore nel caricamento dei todo</p>
        ) : (
          <>
            <CreateForm afterCreate={refetch}/>

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Attivi" {...a11yProps(0)} />
                <Tab label="Completati" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <SimpleTabContent value={value} index={0}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                {todos ? (
                  <SortableContext
                    items={todoList.map((todo) => todo._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {todoList.map((todo, index) => (
                      <SortableItem
                        key={todo._id}
                        index={index}
                        todo={todo}
                        cbUpdated={afterUpdate}
                        cbDeleted={afterDelete}
                      />
                    ))}
                  </SortableContext>
                ) : (
                  ""
                )}
              </DndContext>
            </SimpleTabContent>
            <SimpleTabContent value={value} index={1}>
              {todos ? (
                <SortableContext
                  items={completedTodoList.map((todo) => todo._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {completedTodoList.map((todo, index) => (
                    <SortableItem
                      key={todo._id}
                      index={index}
                      todo={todo}
                      cbUpdated={afterUpdate}
                      cbDeleted={afterDelete}
                    />
                  ))}
                </SortableContext>
              ) : (
                ""
              )}
            </SimpleTabContent>
          </>
        )}
      </DashboardContent>
    </>
  );
}

// ----------------------------------------------------------------------
