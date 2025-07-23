import Carousel from "react-multi-carousel";
import { ArrowProps } from "react-multi-carousel";
import { Trip } from "../features/trips/types";
import TripCard from "./TripCard";
import "react-multi-carousel/lib/styles.css";
import { IoChevronForward } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";

function TripSlider({ trips, title }: { trips: Trip[]; title?: string }) {
  const CustomRightArrow = (_props: ArrowProps) => {
    return (
      <button
        onClick={() => (_props.onClick ? _props.onClick() : null)}
        className="bg-transparent hover:bg-black/50 transition-colors duration-300 cursor-pointer border-0 z-50 absolute top-1/2 -translate-y-1/2 text-3xl p-2 flex justify-center items-center text-white right-4 rounded-full"
      >
        <IoChevronForward />
      </button>
    );
  };
  const CustomLeftArrow = (_props: ArrowProps) => {
    return (
      <button
        onClick={() => (_props.onClick ? _props.onClick() : null)}
        className="bg-transparent hover:bg-black/50 transition-colors duration-300 cursor-pointer border-0 z-50 absolute top-1/2 -translate-y-1/2 text-3xl p-2 flex justify-center items-center text-white left-4 rounded-full"
      >
        <IoChevronBack />
      </button>
    );
  };
  const responsive = {
    xl: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1280 },
      items: 5,
      partialVisibilityGutter: 40,
      slidesToSlide: 4,
    },
    lg: {
      breakpoint: { max: 1280, min: 1024 },
      items: 5,
      partialVisibilityGutter: 40,
      slidesToSlide: 4,
    },
    md: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      partialVisibilityGutter: 40,
      slidesToSlide: 2,
    },
    sm: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
      partialVisibilityGutter: 40,
      slidesToSlide: 1,
    },
    xs: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      partialVisibilityGutter: 40,
      slidesToSlide: 1,
    },
  };
  return (
    <>
      {title ? (
        <h4 className="text-center mb-4 font-inter text-xl">{title}</h4>
      ) : (
        ""
      )}
      <Carousel
        swipeable={true}
        showDots={false}
        partialVisible={true}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={false}
        itemClass="px-1 object-fill h-66 sm:h-60 lg:h-48"
        removeArrowOnDeviceType={["sm", "xs"]}
      >
        {trips.map((trip, index) => (
          <TripCard trip={trip} index={index} hFull="h-full" />
        ))}
      </Carousel>
    </>
  );
}

export default TripSlider;
