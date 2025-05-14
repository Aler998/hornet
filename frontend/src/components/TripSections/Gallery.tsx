import ImageGallery from "react-image-gallery";
import { Trip } from "../../features/trips/types";
import { IoMdImages } from "react-icons/io";

// eslint-disable-next-line react-refresh/only-export-components
export const galleryNav = {
  label: "gallery",
  nav: (
    <span className="mx-2 flex items-center font-oswald font-semibold text-lg cursor-pointer">
      <IoMdImages className="mr-2" /> Immagini
    </span>
  ),
};

export const GalleryContent = ({ trip }: { trip: Trip }) => {
  return trip.images ? (
    <ImageGallery
      thumbnailPosition="top"
      additionalClass="h-[calc(100svh-var(--navbar-height))] max-h-[calc(100svh-var(--navbar-height))] max-w-screen"
      items={trip.images.map((image) => ({
        original:
          import.meta.env.VITE_ASSETS_URL +
          image.folder +
          "/hd/" +
          image.filename,
        thumbnail:
          import.meta.env.VITE_ASSETS_URL +
          image.folder +
          "/thumbnail/" +
          image.filename,
        fullscreen: import.meta.env.VITE_ASSETS_URL + image.path,
        originalHeight: image.height,
        originalWidth: image.width,
        loading: "lazy",
        thumbnailHeight: 100,
        thumbnailWidth: 100,
        thumbnailLoading: "eager",
        originalClass: "h-[calc(100svh-var(--navbar-height)-118px)]",
      }))}
    ></ImageGallery>
  ) : (
    ""
  );
};
