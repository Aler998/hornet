import {
  Box,
  Button,
  Collapse,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useCreateTodoMutation } from "../../features/todos/todosApi";
import { CreateTodoDto } from "../../features/todos/types";
import Swal from "sweetalert2";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { APIError } from "../../utils/interfaces/ApiError";

function CreateForm({ afterCreate }: { afterCreate: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [createTodo] = useCreateTodoMutation();
  const [form, setForm] = useState<CreateTodoDto>({
    title: "",
    link: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTodo(form).unwrap();
      Swal.fire({
        icon: "success",
        title: "Nuovo Todo",
        text: "Nuovo Todo creato",
      });
      afterCreate()
      setForm({title: "", link: ""})
      setOpen(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: APIError | any) {
      if (error.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.data.message,
        });
      }
    }
  };

  return (
    <React.Fragment>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell>
                <Button
                  aria-label="expand-row"
                  onClick={() => setOpen(!open)}
                  variant="contained"
                  color="inherit"
                >
                  Nuovo Todo
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={6}
              >
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <form onSubmit={handleSubmit}>
                              <Grid
                                container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                              >
                                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                                  <TextField
                                    id="title"
                                    name="title"
                                    label="Nome"
                                    variant="outlined"
                                    value={form.title}
                                    onChange={handleFormChange}
                                    required
                                    fullWidth
                                  />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 8 }}>
                                  <TextField
                                    id="link"
                                    name="link"
                                    label="Link Mappa"
                                    variant="outlined"
                                    value={form.link}
                                    onChange={handleFormChange}
                                    required
                                    fullWidth
                                  />
                                </Grid>
                                <Grid>
                                  <Button
                                    color="inherit"
                                    variant="contained"
                                    type="submit"
                                  >
                                    Salva
                                  </Button>
                                </Grid>
                              </Grid>
                            </form>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default CreateForm;
