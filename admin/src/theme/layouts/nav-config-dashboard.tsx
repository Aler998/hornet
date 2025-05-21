import { Label } from "../components/label";
import { SvgColor } from "../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/${import.meta.env.VITE_SUBFOLDER}/assets/icons/navbar/${name}.svg`}
  />
);

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: "Dashboard",
    path: import.meta.env.VITE_SUBFOLDER,
    icon: icon("ic-analytics"),
  },
  {
    title: "Viaggi",
    path: `${import.meta.env.VITE_SUBFOLDER}/trips`,
    icon: icon("ic-user"),
  },
  {
    title: "Categorie",
    path: `${import.meta.env.VITE_SUBFOLDER}/categories`,
    icon: icon("ic-lock"),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: "Todo",
    path: `${import.meta.env.VITE_SUBFOLDER}/todos`,
    icon: icon("ic-blog"),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
];
