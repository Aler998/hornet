import { Link } from "react-router-dom";
import PlaceHolderImage from "./PlaceHolderImage";
import Rating from "./Rating";
import { Trip } from "../features/trips/types";
import { useState } from "react";

function TripCard({
  trip,
  index,
  hFull,
}: {
  trip: Trip;
  index: number;
  hFull?: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={index}
      className={`block relative group w-full break-inside-avoid rounded ${hFull}`}
    >
      <Link
        to={`/me/trip/${trip.slug}`}
        className={`block relative w-full ${hFull}`}
      >
        {trip.images.length > 0 ? (
          <img
            className={`w-full h-full rounded ${hFull ? "object-cover" : ""}`}
            src={import.meta.env.VITE_ASSETS_URL + trip.images[0].path}
          />
        ) : (
          <PlaceHolderImage classes="w-full h-full" />
        )}
        <div
          className={`${hover ? "md:opacity-100" : "md:opacity-0"} text-shadow-lg transition-opacity duration-300 rounded absolute top-0 left-0 w-full text-white capitalize p-2`}
        >
          <h5 className="fonte-inter">{trip.title}</h5>
        </div>
        <div
          className={`${hover ? "md:opacity-100" : "md:opacity-0"} transition-opacity duration-300 absolute bottom-0 left-0 w-full`}
        >
          <Rating voto={trip.rating} />
        </div>
      </Link>
    </div>
  );
}

export default TripCard;
