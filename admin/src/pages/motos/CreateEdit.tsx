import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  useCreateMotoMutation,
  useGetMotoQuery,
  useUpdateMotoMutation,
} from "../../features/motos/motosApi";
import { CreateMotoDto, Segment } from "../../features/motos/types";
import { DashboardContent } from "../../theme/layouts/dashboard";
import Swal from "sweetalert2";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { APIError } from "../../utils/interfaces/ApiError";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "../../utils/visually-hidden-input";
import { errorSwalOptions } from "../../utils/swal-options";

export default function CreateEdit() {
  const { _id } = useParams<{ _id: string }>();
  const isEdit = _id ? true : false;
  console.log(isEdit);
  
  const {
    data: existingMoto,
    isError,
    error,
  } = useGetMotoQuery(_id!, { skip: !isEdit });
  const [createMoto] = useCreateMotoMutation();
  const [updateMoto] = useUpdateMotoMutation();
  const navigate = useNavigate();
  const [imageLabel, setImageLabel] = useState<string>("Carica immagine");

  const [form, setForm] = useState<CreateMotoDto>({
    name: "",
    segment: null,
    image: null,
    consumo: "",
  });

  useEffect(() => {
    
    if (existingMoto) {
      setForm({
        name: existingMoto.name,
        segment: existingMoto.segment,
        consumo: existingMoto.consumo,
        image: null,
      });
    }
  }, [existingMoto]);

  useEffect(() => {
    if (isError && error && "status" in error && error.status === 404) {
      navigate(`/${import.meta.env.VITE_SUBFOLDER}/404`);
    }
  }, [isError, error, navigate]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.name == "image") setImageLabel(e.target.files[0].name);
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.consumo && isNaN(parseFloat(form.consumo))) {
      Swal.fire(errorSwalOptions("Consumo deve essere numerico"));
      return;
    }

    try {
      if (isEdit && existingMoto) {
        await updateMoto({
          _id: existingMoto._id,
          name: form.name,
          segment: form.segment,
          consumo: form.consumo,
          image: form.image
        }).unwrap();
        Swal.fire({
          icon: "success",
          title: "Categoria Modificata",
          text: `La moto ${existingMoto.name} è stata modificata`,
        });
      } else {
        await createMoto(form).unwrap();
        Swal.fire({
          icon: "success",
          title: "Nuova Categoria",
          text: "Nuova moto creata",
        });
      }
      navigate(`/${import.meta.env.VITE_SUBFOLDER}/motos`);
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
    <>
      <title>{`Categorie`}</title>

      <DashboardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Typography variant="h6">Nuova Moto</Typography>
          <Button
            color="inherit"
            onClick={() => navigate(`/${import.meta.env.VITE_SUBFOLDER}/motos`)}
            variant="text"
          >
            Indietro
          </Button>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Stack spacing={2}>
                <TextField
                  id="name"
                  name="name"
                  label="Nome"
                  variant="outlined"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  fullWidth
                />

                <Autocomplete
                  disablePortal
                  fullWidth
                  options={Object.values(Segment)}
                  value={
                    Object.values(Segment).find(
                      (segment) => segment === form.segment
                    ) || null
                  }
                  onChange={(_event, newValue) => {
                    setForm({
                      ...form,
                      segment: newValue ? newValue : null,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField required {...params} label="Segmento" />
                  )}
                />
                <TextField
                  id="consumo"
                  name="consumo"
                  label="Consumo"
                  variant="outlined"
                  value={form.consumo}
                  onChange={handleFormChange}
                  required
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Stack spacing={2}>
                {existingMoto && existingMoto.image ? (
                  <img
                    srcSet={`${import.meta.env.VITE_ASSETS_URL}${existingMoto.image}`}
                    src={`${import.meta.env.VITE_ASSETS_URL}${existingMoto.image}`}
                    width={164}
                    style={{ objectFit: "cover", overflow: "hidden" }}
                    loading="lazy"
                  />
                ) : (
                  ""
                )}
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  color="inherit"
                >
                  {imageLabel}
                  <VisuallyHiddenInput
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </Button>
              </Stack>
            </Grid>
            <Grid>
              <Button color="inherit" variant="contained" type="submit">
                {isEdit ? "Salva Modifiche" : "Crea Categoria"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DashboardContent>
    </>
  );
}
