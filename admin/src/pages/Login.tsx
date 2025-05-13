import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import LoginRequest from "../features/auth/types";
import { useLoginMutation } from "../features/auth/authApi";
import { Iconify } from "../theme/components/iconify";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form)
        .unwrap()
        .then(() => navigate(`/${import.meta.env.VITE_SUBFOLDER}`));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login fallito",
      });
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <TextField
          fullWidth
          name="username"
          label="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          sx={{ mb: 3 }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <TextField
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={
                        showPassword
                          ? "solar:eye-bold"
                          : "solar:eye-closed-bold"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 3 }}
        />

        <Button
          disabled={isLoading}
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
        >
          Login
        </Button>
      </Box>
    </form>
  );

  return (
    <>
      <title>Dashboard</title>
      <meta
        name="description"
        content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
      />
      <meta
        name="keywords"
        content="react,material,kit,application,dashboard,admin,template"
      />

      <>
        <Box
          sx={{
            gap: 1.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Typography variant="h5">Login</Typography>
        </Box>
        {renderForm}
        {error ? <p>Errore durante il login</p> : ""}
      </>
    </>
  );
}
