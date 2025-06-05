
import { MdSpaceDashboard } from "react-icons/md";
import { TabItem } from "../../utils/types";
import { MdOutlineMap } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import Index from "../../pages/me/Index";
import Trips from "../../pages/me/Trips";
import Map from "../../pages/me/Map";
import Todos from "../../pages/me/Todos";


export const navItems = [
  {
    title: "Home",
    link: "/me",
    page: <Index />
  },
  {
    title: "Viaggi",
    link: "/me/trips",
    page: <Trips />
  },
  {
    title: "Mappa",
    link: "/me/map",
    page: <Map />
  },
  {
    title: "Statistiche",
    link: "/me/trips",
    page: <Index />
  },
  {
    title: "Amici",
    link: "/me/trips",
    page: <Index />
  },
  {
    title: "Da Fare",
    link: "/me/todos",
    page: <Todos />
  },
];

export const getDividedNavItems = () => {
  const mid = Math.ceil(navItems.length / 2);

  return {
    first: navItems.slice(0, mid),
    second: navItems.slice(mid),
  };
};


export const homeNav: TabItem = {
  label: "details",
  nav: (
    <span className="mx-2 flex items-center font-oswald font-semibold text-lg cursor-pointer">
      <MdSpaceDashboard className="mr-2" /> Home
    </span>
  ),
};

export const mapsNav : TabItem = {
  label: "maps",
  nav: (
    <span className="mx-2 flex items-center font-oswald font-semibold text-lg cursor-pointer">
      <MdOutlineMap className="mr-2" /> Mappe
    </span>
  ),
};

export const galleryNav : TabItem = {
  label: "gallery",
  nav: (
    <span className="mx-2 flex items-center font-oswald font-semibold text-lg cursor-pointer">
      <IoMdImages className="mr-2" /> Immagini
    </span>
  ),
};
