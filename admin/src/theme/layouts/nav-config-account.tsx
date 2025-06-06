import { Iconify } from "../components/iconify";
import PersonIcon from '@mui/icons-material/Person';
import type { AccountPopoverProps } from "./components/account-popover";

// ----------------------------------------------------------------------

export const _account: AccountPopoverProps["data"] = [
  {
    label: "Home",
    href: import.meta.env.VITE_SUBFOLDER,
    icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
  },
  {
    label: "Profilo",
    href: import.meta.env.VITE_SUBFOLDER + "/profile",
    icon: <PersonIcon />,
  },
];
