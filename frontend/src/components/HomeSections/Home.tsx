import ThemeSwitcher from "../ThemeSwitcher";
import Logo from "../Logo";
import { Trip } from "../../features/trips/types";
import Masonry from "react-masonry-css";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../Rating";
import Scrollbar from "react-scrollbars-custom";
import { MdHome } from "react-icons/md";

function Home({ title, trips }: { title: string; trips: Trip[] }) {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const navigate = useNavigate();

  return (
    <Scrollbar>
      <div className="w-full min-w-screen py-8 px-4 flex justify-end align-center">
        <ThemeSwitcher />
        <MdHome
          onClick={() => navigate("/")}
          className="text-slate-400 w-5 h-5 ml-4 cursor-pointer"
        />
      </div>
      <div className="w-wull min-w-screen text-gray-900 font-oswald">
        <div className="w-full mx-auto max-w-full md:max-w-2/3 lg:max-w-1/3 flex flex-col items-center md-8 sm:mb-16">
          <Logo classes="w-10 h-10" />
          <h1 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl font-inter">
            <span className="font-inter animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
              {title}
            </span>
          </h1>
        </div>
        <div className="max-w-3xl mx-auto px-4">
          {trips ? (
            <>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {trips.map((trip) => {
                  if (trip.images.length > 0) {
                    return (
                      <div
                        key={trip._id}
                        className="block relative group w-full break-inside-avoid"
                      >
                        <Link
                          to={`/trip/${trip.slug}`}
                          className="block relative w-full"
                        >
                          <img
                            className="w-full h-full"
                            src={
                              import.meta.env.VITE_ASSETS_URL +
                              trip.images[0].path
                            }
                          />
                          <div className="absolute top-0 left-0 w-full text-white capitalize bg-gradient-to-b p-2 from-slate-700 to-white/0">
                            <h5 className="fonte-inter">{trip.title}</h5>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full">
                            <Rating voto={trip.rating} />
                          </div>
                        </Link>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={trip._id}
                        className="block relative group w-full break-inside-avoid"
                      >
                        <Link
                          to={`/trip/${trip.slug}`}
                          className="block relative w-full"
                        >
                          <svg
                            className="w-full h-full"
                            viewBox="0 0 120 120"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <rect
                                width="120"
                                height="120"
                                fill="#EFF1F3"
                              ></rect>{" "}
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M33.2503 38.4816C33.2603 37.0472 34.4199 35.8864 35.8543 35.875H83.1463C84.5848 35.875 85.7503 37.0431 85.7503 38.4816V80.5184C85.7403 81.9528 84.5807 83.1136 83.1463 83.125H35.8543C34.4158 83.1236 33.2503 81.957 33.2503 80.5184V38.4816ZM80.5006 41.1251H38.5006V77.8751L62.8921 53.4783C63.9172 52.4536 65.5788 52.4536 66.6039 53.4783L80.5006 67.4013V41.1251ZM43.75 51.6249C43.75 54.5244 46.1005 56.8749 49 56.8749C51.8995 56.8749 54.25 54.5244 54.25 51.6249C54.25 48.7254 51.8995 46.3749 49 46.3749C46.1005 46.3749 43.75 48.7254 43.75 51.6249Z"
                                fill="#687787"
                              ></path>{" "}
                            </g>
                          </svg>
                          <div className="absolute top-0 left-0 w-full text-white capitalize bg-gradient-to-b p-2 from-slate-700 to-white/0">
                            <h5 className="font-inter">{trip.title}</h5>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full">
                            <Rating voto={trip.rating} />
                          </div>
                        </Link>
                      </div>
                    );
                  }
                })}
              </Masonry>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </Scrollbar>
  );
}

export default Home;
