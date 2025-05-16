import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Rating,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import slugify from "slugify";
import { DashboardContent } from "../../theme/layouts/dashboard";
import Swal from "sweetalert2";
import { isAPIError } from "../../utils/interfaces/ApiError";
import {
  useCreateTripMutation,
  useGetTripQuery,
  useUpdateTripMutation,
} from "../../features/trips/tripsApi";
import { CreateTripDto } from "../../features/trips/types";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Label } from "../../theme/components/label";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";

import dayjs, { Dayjs } from "dayjs";
import { errorSwalOptions } from "../../utils/SwalOptions";
import ImageUpload from "../../components/form/ImageUpload";
import GPXUpload from "../../components/form/GPXUpload";
import CityInput from "../../components/form/CityInput";

export default function CreateEdit() {
  const { slug } = useParams<{ slug: string }>();
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  const isEdit = slug ? true : false;
  const {
    data: existingTrip,
    isError: tripIsError,
    error: tripError,
  } = useGetTripQuery(slug!, { skip: !isEdit });
  const [createTrip] = useCreateTripMutation();
  const [updateTrip] = useUpdateTripMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateTripDto>({
    title: "",
    description: "",
    rating: 3,
    km: 50,
    velocity: 50,
    slug: "",
    category: "",
    start: dayjs(),
    end: dayjs(),
    images: [],
    tracks: [],
    places: [],
  });

  useEffect(() => {
    if (existingTrip) {
      setForm({
        title: existingTrip.title,
        description: existingTrip.description,
        rating: existingTrip.rating ?? 0,
        km: existingTrip.km ?? 50,
        velocity: existingTrip.velocity ?? 50,
        slug: existingTrip.slug,
        category: existingTrip.category,
        start: dayjs(existingTrip.start),
        end: dayjs(existingTrip.end),
        images: null,
        tracks: null,
        places: [],
      });
    }
  }, [existingTrip]);

  useEffect(() => {
    if (
      tripIsError &&
      tripError &&
      "status" in tripError &&
      tripError.status === 404
    ) {
      navigate(`/${import.meta.env.VITE_SUBFOLDER}/404`);
    }
  }, [tripIsError, error, navigate, tripError]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      title: e.target.value,
      slug: slugify(e.target.value).toLowerCase(),
    });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, slug: slugify(e.target.value).toLowerCase() });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormNumberChange = (
    value: number | number[] | null,
    field: string
  ) => {
    setForm({ ...form, [field]: value ? value : 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && existingTrip) {
        await updateTrip({
          ...form,
          slug: existingTrip.slug,
          ...(form.slug !== existingTrip.slug && { newSlug: form.slug }),
        }).unwrap();
        Swal.fire({
          icon: "success",
          title: "Viaggio modificato",
          text: `Il Viaggio ${existingTrip.title} è stato modificato`,
        });
      } else {
        await createTrip(form).unwrap();
        Swal.fire({
          icon: "success",
          title: "Nuovo Viaggio",
          text: "Nuovo viaggio creato",
        });
      }
      navigate(`/${import.meta.env.VITE_SUBFOLDER}/trips`);
    } catch (error: unknown) {
      if (isAPIError(error) && error.status === 400) {
        Swal.fire(errorSwalOptions(error.data.message));
      }
    }
  };

  return (
    <>
      <title>{`Viaggi`}</title>

      <DashboardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Typography variant="h6">Nuovo Viaggio</Typography>
          <Button
            onClick={() => navigate(`/${import.meta.env.VITE_SUBFOLDER}/trips`)}
            variant="text"
            color="inherit"
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
                  id="title"
                  name="title"
                  label="Nome"
                  variant="outlined"
                  value={form.title}
                  onChange={handleTitleChange}
                  required
                  fullWidth
                />

                <TextField
                  id="slug"
                  name="slug"
                  label="Slug"
                  variant="outlined"
                  value={form.slug}
                  onChange={handleSlugChange}
                  required
                  fullWidth
                />
                <TextField
                  id="description"
                  name="description"
                  label="Descrizione"
                  variant="outlined"
                  value={form.description}
                  onChange={handleFormChange}
                  multiline
                  rows={3}
                  fullWidth
                />
                <Autocomplete
                  disablePortal
                  fullWidth
                  disabled={isLoading || Boolean(error)}
                  options={categories ? categories : []}
                  getOptionLabel={(option) => option.title}
                  value={
                    categories?.find((cat) => cat._id === form.category) || null
                  }
                  onChange={(_event, newValue) => {
                    setForm({
                      ...form,
                      category: newValue ? newValue._id : "",
                    });
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  renderInput={(params) => (
                    <TextField required {...params} label="Categoria" />
                  )}
                />
                <CityInput form={form} setForm={setForm} isEdit={isEdit} existingTrip={existingTrip} />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Stack spacing={3}>
                <Stack spacing={2}>
                  <Label sx={{ marginBottom: 0.5 }}>Partenza</Label>
                  <DateTimePicker
                    name="start"
                    label="Data e Ora"
                    value={form.start}
                    onChange={(value: Dayjs | null) =>
                      setForm({ ...form, start: dayjs(value) })
                    }
                  />
                </Stack>
                <Stack spacing={2}>
                  <Label sx={{ marginBottom: 0.5 }}>Arrivo</Label>
                  <DateTimePicker
                    name="end"
                    label="Data e Ora"
                    value={form.end}
                    onChange={(value: Dayjs | null) =>
                      setForm({ ...form, end: dayjs(value) })
                    }
                  />
                </Stack>
                <Stack spacing={2}>
                  <Label>Kilometri Percorsi</Label>
                  <Slider
                    value={form.km}
                    onChange={(_e, value) =>
                      handleFormNumberChange(value, "km")
                    }
                    defaultValue={50}
                    min={0}
                    max={500}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </Stack>
                <Stack spacing={2}>
                  <Label>Velocità Media</Label>
                  <Slider
                    value={form.velocity}
                    onChange={(_e, value) =>
                      handleFormNumberChange(value, "velocity")
                    }
                    defaultValue={50}
                    min={0}
                    max={150}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid size={12}>
              <ImageUpload
                form={form}
                setForm={setForm}
                isEdit={isEdit}
                existingTrip={existingTrip}
              />
            </Grid>
            <Grid size={12}>
              <GPXUpload
                form={form}
                setForm={setForm}
                isEdit={isEdit}
                existingTrip={existingTrip}
              />
            </Grid>

            <Grid size={12}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack spacing={2}>
                  <Typography>Dai un voto a questo viaggio!</Typography>
                  <Rating
                    name="rating"
                    value={form.rating}
                    onChange={(_e, value: number | null) =>
                      handleFormNumberChange(value, "rating")
                    }
                  />
                </Stack>
                <Button variant="contained" color="inherit" type="submit">
                  {isEdit ? "Salva Modifiche" : "Salva Viaggio"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </DashboardContent>
    </>
  );
}
