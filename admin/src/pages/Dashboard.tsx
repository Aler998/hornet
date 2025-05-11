import { Grid, Typography } from "@mui/material";
import { DashboardContent } from "../theme/layouts/dashboard";
import { WidgetSummary } from "../components/widgets/WidgetSummary";
import { AnalyticsCurrentSubject } from "../theme/sections/dashboard/analytics-current-subject";
import { AnalyticsTasks } from "../theme/sections/dashboard/analytics-tasks";
import { _tasks } from "../theme/_mock";
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
            <WidgetSummary
              title="Purchase orders"
              percent={2.8}
              total={1723315}
              color="warning"
              icon={
                <img
                  alt="Purchase orders"
                  src={
                    "/" +
                    import.meta.env.VITE_SUBFOLDER +
                    "/assets/icons/glass/ic-glass-buy.svg"
                  }
                />
              }
              chart={{
                categories: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                ],
                series: [40, 70, 50, 28, 70, 75, 7, 64],
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <WidgetSummary
              title="Messages"
              percent={3.6}
              total={234}
              color="error"
              icon={
                <img
                  alt="Messages"
                  src={
                    "/" +
                    import.meta.env.VITE_SUBFOLDER +
                    "/assets/icons/glass/ic-glass-message.svg"
                  }
                />
              }
              chart={{
                categories: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                ],
                series: [56, 30, 23, 54, 47, 40, 62, 73],
              }}
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
            <AnalyticsCurrentSubject
              title="Current subject"
              chart={{
                categories: [
                  "English",
                  "History",
                  "Physics",
                  "Geography",
                  "Chinese",
                  "Math",
                ],
                series: [
                  { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
                  { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
                  { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
                ],
              }}
            />
          </Grid>



          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <UltimiViaggi trips={trips} />
          </Grid>


          <Grid size={{ xs: 12, md: 6, lg: 8 }}>
            <AnalyticsTasks title="Tasks" list={_tasks} />
          </Grid>
        </Grid>
      </DashboardContent>
    </>
  );
}
