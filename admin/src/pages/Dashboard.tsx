import { Grid, Typography } from "@mui/material";
import { DashboardContent } from "../theme/layouts/dashboard";
import { useGetTripsQuery } from "../features/trips/tripsApi";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { errorSwalOptions } from "../utils/SwalOptions";
import { useGetCategoriesQuery } from "../features/categories/categoriesApi";
import ViaggiPerCategoria from "../components/stats/ViaggiPerCategoria";
import NumericWidget, {
  NumericWidgetType,
} from "../components/stats/NumericWidget";
import RatingChart from "../components/stats/RatingChart";
import ViaggiPerMese from "../components/stats/ViaggiPerMese";
import UltimiViaggi from "../components/stats/UltimiViaggi";

export default function Dashboard() {
  const { data: trips, isLoading, isError } = useGetTripsQuery();
  const {
    data: categories,
    isLoading: catIsLoading,
    isError: catIsError,
  } = useGetCategoriesQuery();

  if (isLoading || catIsLoading) return <Loader />;

  if (isError || catIsError) Swal.fire(errorSwalOptions("Errore Generico"));

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

      <DashboardContent maxWidth="xl">
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Bentornato 🏍️
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <NumericWidget
              title="Kilometri"
              color="primary"
              trips={trips}
              field={NumericWidgetType.km}
              icon={
                <img
                  alt="Weekly sales"
                  src={
                    "/" +
                    import.meta.env.VITE_SUBFOLDER +
                    "/assets/icons/glass/ic-glass-bag.svg"
                  }
                />
              }
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <NumericWidget
              title="Benzina Usata"
              color="secondary"
              trips={trips}
              field={NumericWidgetType.liters}
              icon={
                <img
                  alt="New users"
                  src={
                    "/" +
                    import.meta.env.VITE_SUBFOLDER +
                    "/assets/icons/glass/ic-glass-users.svg"
                  }
                />
              }
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <NumericWidget
              title="Soldi Spesi"
              color="warning"
              trips={trips}
              field={NumericWidgetType.euros}
              icon={
                <img
                  alt="New users"
                  src={
                    "/" +
                    import.meta.env.VITE_SUBFOLDER +
                    "/assets/icons/glass/ic-glass-buy.svg"
                  }
                />
              }
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <NumericWidget
              title="Ore In Moto"
              color="error"
              trips={trips}
              field={NumericWidgetType.hours}
              icon={
                <img
                  alt="New users"
                  src={
                    "/" +
                    import.meta.env.VITE_SUBFOLDER +
                    "/assets/icons/glass/ic-glass-message.svg"
                  }
                />
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <ViaggiPerCategoria trips={trips} categories={categories} />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 8 }}>
            <ViaggiPerMese trips={trips} />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 8 }}>
            <RatingChart trips={trips} />
          </Grid>


          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <UltimiViaggi trips={trips} />
          </Grid>

        </Grid>
      </DashboardContent>
    </>
  );
}
