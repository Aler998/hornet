import { MdSpaceDashboard } from "react-icons/md";
import { NavItem } from "../utils/types";
import { MdOutlineMap } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import { MdMap } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";


export const homeNav: NavItem = {
  label: "details",
  nav: (
    <span className="mx-2 flex items-center font-oswald font-semibold text-lg cursor-pointer">
      <MdSpaceDashboard className="mr-2" /> Home
    </span>
  ),
};

export const mapsNav = {
  label: "maps",
  nav: (
    <span className="mx-2 flex items-center font-oswald font-semibold text-lg cursor-pointer">
      <MdOutlineMap className="mr-2" /> Mappe
    </span>
  ),
};

export const galleryNav = {
  label: "gallery",
  nav: (
    <span className="mx-2 flex items-center font-oswald font-semibold text-lg cursor-pointer">
      <IoMdImages className="mr-2" /> Immagini
    </span>
  ),
};

export const heatmapNav = {
  label: "heatmap",
  nav: (
    <span className="mx-2 flex items-center font-oswald font-semibold text-lg cursor-pointer">
      <MdMap className="mr-2" /> Mappa
    </span>
  ),
};

export const todoNav = {
  label: "todos",
  nav: (
    <span className="mx-2 flex items-center font-oswald font-semibold text-lg cursor-pointer">
      <MdFormatListBulleted className="mr-2" /> Da Fare
    </span>
  ),
};
