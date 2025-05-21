import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from "../../features/todos/types";
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import Swal from "sweetalert2";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useUpdateTodoMutation } from "../../features/todos/todosApi";

function SortableItem({
  index,
  todo,
  cbUpdated,
  cbDeleted,
}: {
  index: number;
  todo: Todo;
  cbUpdated: (_id: string) => void;
  cbDeleted: (_id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo._id });
  const theme = useTheme();
  const [updateTodo] = useUpdateTodoMutation();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleComplete = (_id: string) => {
    updateTodo({
      _id: todo._id,
      title: todo.title,
      link: todo.link,
      order: null,
      completed: true,
    }).then(() => cbUpdated(_id));
  };

  const confirmDelete = (_id: string) => {
    Swal.fire({
      title: "Sei sicuro?",
      text: "Non potrai tornare indietro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si conferma",
    }).then((result) => {
      if (result.isConfirmed) {
        cbDeleted(_id);
      }
    });
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Box
        sx={{
          borderRadius: 1,
          background: "#fff",
          marginBottom: 1,
          boxShadow: 1,
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow key={todo._id}>
                <TableCell width="4%" component="th" scope="row">
                  <Checkbox
                    checked={todo.completed}
                    disabled={todo.completed}
                    onChange={() => handleComplete(todo._id)}
                    color="success"
                  />
                </TableCell>
                <TableCell width="90%" component="th" scope="row">
                  <Typography
                    color={theme.palette.text.primary}
                    fontSize={
                      todo.completed ? 16 : index == 0 ? 23 : index == 1 ? 19 : index == 2 ? 16 : 13
                    }
                    fontWeight={700}
                    sx={{
                      textDecoration: todo.completed ? "line-through" : "",
                    }}
                  >
                    {todo.title.toLocaleUpperCase()}
                  </Typography>
                </TableCell>
                <TableCell width="2%" align="right">
                  <OpenInNewIcon
                    color="primary"
                    sx={{ cursor: "pointer" }}
                    onClick={() => window.open(todo.link, "_blank")}
                  />
                </TableCell>
                <TableCell width="2%" align="right">
                  <DeleteOutlineIcon
                    sx={{ cursor: "pointer" }}
                    color="error"
                    onClick={() => confirmDelete(todo._id)}
                  >
                    Elimina
                  </DeleteOutlineIcon>
                </TableCell>
                {!todo.completed ? (
                  <TableCell width="2%">
                    <DragIndicatorIcon
                      sx={{ cursor: "grab" }}
                      {...attributes}
                      {...listeners}
                    />
                  </TableCell>
                ) : (
                  ""
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default SortableItem;
