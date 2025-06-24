import { Label } from "../components/label";
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import CategoryIcon from '@mui/icons-material/Category';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const getNavData = (isAdmin: boolean | undefined) => [
  {
    title: "Dashboard",
    path: import.meta.env.VITE_SUBFOLDER,
    icon: <DashboardIcon />,
  },
  {
    title: "Viaggi",
    path: `${import.meta.env.VITE_SUBFOLDER}/trips`,
    icon: <MapIcon />,
  },
  ...(isAdmin
    ? [
        {
          title: "Categorie",
          path: `${import.meta.env.VITE_SUBFOLDER}/categories`,
          icon: <CategoryIcon />,
          info: (
            <Label color="error" variant="inverted">
              +3
            </Label>
          ),
        },
      ]
    : []),
  {
    title: "Todo",
    path: `${import.meta.env.VITE_SUBFOLDER}/todos`,
    icon: <FormatListBulletedIcon />,
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: "Le Mie Moto",
    path: `${import.meta.env.VITE_SUBFOLDER}/motos`,
    icon: <TwoWheelerIcon />,
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
];
