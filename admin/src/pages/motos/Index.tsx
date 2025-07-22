import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { DashboardContent } from "../../theme/layouts/dashboard";
import { Link, useNavigate } from "react-router-dom";
import { Iconify } from "../../theme/components/iconify";
import { useGetMotosQuery } from "../../features/motos/motosApi";
import Loader from "../../components/Loader";
import EditIcon from "@mui/icons-material/Edit";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";

function Index() {
  const { data: motos, isLoading, error } = useGetMotosQuery();
  const navigate = useNavigate();

  if (isLoading) return <Loader />;

  return (
    <>
      <title>{`Le mie Moto`}</title>

      <DashboardContent>
        {error ? (
          <p>Errore Nel caricamento delle moto</p>
        ) : (
          <>
            <Box
              sx={{
                mb: 5,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" sx={{ flexGrow: 1 }}>
                Le mie Moto
              </Typography>
              <Button
                onClick={() =>
                  navigate(`/${import.meta.env.VITE_SUBFOLDER}/moto/create`)
                }
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Nuova Moto
              </Button>
            </Box>
            <ImageList
              sx={{
                width: "100%",
                height: 450,
                // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                transform: "translateZ(0)",
              }}
              rowHeight={200}
              gap={1}
              cols={4}
            >
              {motos
                ? motos.map((moto) => {
                    return (
                      <ImageListItem key={moto._id} cols={1} rows={1}>
                        {moto.image ? (
                          <img
                            src={`${import.meta.env.VITE_ASSETS_URL}${moto.image}`}
                            alt={moto.name}
                            loading="lazy"
                          />
                        ) : (
                          <Box
                            width="100%"
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <TwoWheelerIcon color="disabled" sx={{ fontSize: 90 }}/>
                          </Box>
                        )}
                        <ImageListItemBar
                          sx={{
                            background:
                              "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                              "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                          }}
                          title={moto.name}
                          position="top"
                          actionIcon={
                            <Link
                              to={`/${import.meta.env.VITE_SUBFOLDER}/moto/${moto._id}/edit`}
                            >
                              <IconButton
                                sx={{ color: "white" }}
                                aria-label={`star ${moto.name}`}
                              >
                                <EditIcon />
                              </IconButton>
                            </Link>
                          }
                          actionPosition="left"
                        />
                      </ImageListItem>
                    );
                  })
                : ""}
            </ImageList>
          </>
        )}
      </DashboardContent>
    </>
  );
}

export default Index;
