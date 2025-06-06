import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { DashboardContent } from "../../theme/layouts/dashboard";
import Swal from "sweetalert2";
import {
  useGetMeQuery,
} from "../../features/auth/authApi";
import { UpdateUserDto } from "../../features/auth/types";
import { VisuallyHiddenInput } from "../../utils/visually-hidden-input";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useUpdateUserMutation } from "../../features/auth/userApi";

export default function Edit() {
  const { data: me, isError, error, refetch: refetchMe } = useGetMeQuery();  
  const [profileLabel, setProfileLabel] = useState<string>("Carica immagine profilo")
  const [coverLabel, setCoverLabel] = useState<string>("Carica cover profilo")
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState<UpdateUserDto>({
    username: "",
    name: "",
    email: "",
    profile: null,
    cover: null,
  });

  useEffect(() => {
    if (me) {    
      setForm({
        username: me.username,
        name: me.name,
        email: me.email,
        cover: null,
        profile: null,
      });
    }
  }, [me]);

  useEffect(() => {
    if (isError && error && "status" in error && error.status === 404) {
      navigate(`/${import.meta.env.VITE_SUBFOLDER}/404`);
    }
  }, [isError, error, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.name == "cover") setCoverLabel(e.target.files[0].name)
    if (e.target.name == "profile") setProfileLabel(e.target.files[0].name)
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(form).unwrap();
      Swal.fire({
        icon: "success",
        title: "Utente Modificato",
        text: `Hai modificato correttamente le tue informazioni`,
      });
      refetchMe()
      setCoverLabel("Carica cover profilo")
      setProfileLabel("Carica immagine profilo")
      
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Si è verificato un errore",
      });
    }
  };

  return (
    <>
      <title>{`Profilo`}</title>

      <DashboardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Typography variant="h6">Modifica informazioni</Typography>
          <Button
            color="inherit"
            onClick={() => navigate(`/${import.meta.env.VITE_SUBFOLDER}`)}
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
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  value={form.username}
                  onChange={handleTextChange}
                  required
                  fullWidth
                />
                <TextField
                  id="name"
                  name="name"
                  label="Nome"
                  variant="outlined"
                  value={form.name}
                  onChange={handleTextChange}
                  required
                  fullWidth
                />
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={form.email}
                  onChange={handleTextChange}
                  required
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Stack spacing={2}>
                {me && me.profile ? (
                    <img
                  srcSet={`${import.meta.env.VITE_ASSETS_URL}${me.profile}`}
                  src={`${import.meta.env.VITE_ASSETS_URL}${me.profile}`}
                  width={164}
                  style={{ objectFit: "cover", overflow: "hidden" }}
                  loading="lazy"
                />
                ) : ""}
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  color="inherit"
                >
                  {profileLabel}
                  <VisuallyHiddenInput
                    type="file"
                    name="profile"
                    onChange={handleImageChange}
                  />
                </Button>
                {me && me.cover ? (
                    <img
                  srcSet={`${import.meta.env.VITE_ASSETS_URL}${me.cover}`}
                  src={`${import.meta.env.VITE_ASSETS_URL}${me.cover}`}
                  width={164}
                  style={{ objectFit: "cover", overflow: "hidden" }}
                  loading="lazy"
                />
                ) : ""}
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  color="inherit"
                >
                  {coverLabel}
                  <VisuallyHiddenInput
                    type="file"
                    name="cover"
                    onChange={handleImageChange}
                  />
                </Button>
              </Stack>
            </Grid>
            <Grid>
              <Button color="inherit" variant="contained" type="submit">
                Salva
              </Button>
            </Grid>
          </Grid>
        </form>
      </DashboardContent>
    </>
  );
}
