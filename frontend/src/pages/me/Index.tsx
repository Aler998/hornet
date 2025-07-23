import { useNavigate } from "react-router-dom";
import MeLayout from "../../components/Layout/MeLayout";
import SearchBar from "../../components/SearchBar";
import { useGetMeQuery } from "../../features/auth/authApi";
import { useEffect, useState } from "react";
import TripSlider from "../../components/TripSlider";
import { useGetTripsQuery } from "../../features/trips/tripsApi";
import { Trip } from "../../features/trips/types";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { Category } from "../../features/categories/types";
import TripCard from "../../components/TripCard";

function Index() {
  const { data: me, isLoading, isError } = useGetMeQuery();
  const {
    data: categories,
    isLoading: useGetCategoriesLoading,
    isError: useGetCategoriesError,
  } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const {
    data: trips,
    isLoading: useGetTripsLoading,
    isError: useGetTripsError,
  } = useGetTripsQuery({});

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  useEffect(() => {
    if (isError || useGetTripsError || useGetCategoriesError) {
      navigate("/500");
    }
  }, [isError, navigate, useGetTripsError, useGetCategoriesError]);

  useEffect(() => {
    if (categories) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  return (
    <MeLayout
      isLoading={isLoading || useGetTripsLoading || useGetCategoriesLoading}
      me={me}
      title="IlMotoDiario"
    >
      <SearchBar classes="hidden sm:block sm:mb-12" />

      <div className="px-4 mb-20">
        {trips ? (
          <TripSlider
            title="Ultimi Viaggi"
            trips={[...trips]
              .sort(
                (a: Trip, b: Trip) =>
                  b.createdAt.valueOf() - a.createdAt.valueOf()
              )
              .slice(0, 15)}
          />
        ) : (
          "Errore nel caricamento degli ultimi viaggi"
        )}
      </div>

      {categories && trips ? (
        <div className="px-4 mb-20">
          <ul className="w-full flex justify-center flex-row list-none ">
            {categories.map((cat) => (
              <motion.li
                className="font-inter text-xl cursor-pointer font-semibold mb-4 px-4 relative"
                key={cat._id}
                initial={false}
                animate={{
                  color: cat === selectedCategory ? "#000" : "grey",
                }}
                onClick={() => setSelectedCategory(cat)}
              >
                {`${cat.title}`}
                {cat === selectedCategory ? (
                  <motion.div
                    className="absolute -bottom-1 left-0 h-1 w-full bg-black"
                    layoutId="underline"
                    id="underline"
                  />
                ) : null}
              </motion.li>
            ))}
          </ul>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory ? selectedCategory.title : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {selectedCategory ? (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[...trips]
                    .sort(
                      (a: Trip, b: Trip) =>
                        b.createdAt.valueOf() - a.createdAt.valueOf()
                    )
                    .filter((trip) => trip.category == selectedCategory._id)
                    .slice(0, 9)
                    .map((trip, index) => (
                      <div key={index}
                        className={`${index == 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}`}
                      >
                        <TripCard trip={trip} index={index} hFull="h-full" />
                      </div>
                    ))}
                </div>
              ) : (
                "😋"
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        "Errore nel caricamento delle categorie"
      )}

      <div className="px-4 mb-20">
        <h4 className="text-center mb-4 font-inter text-xl">I Più Apprezzati</h4>
        {trips ? (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {[...trips]
              .sort((a: Trip, b: Trip) => {
                const diffRating = b.rating - a.rating;
                if (diffRating !== 0) return diffRating;
                return (
                  b.createdAt.valueOf() - a.createdAt.valueOf() && a.rating
                );
              })
              .slice(0, 7)
              .map((trip, index) => (
                <div key={index}
                  className={`${index == 3 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}`}
                >
                  <TripCard trip={trip} index={index} hFull="h-full" />
                </div>
              ))}
          </div>
        ) : (
          "Errore nel caricamento dei più votati"
        )}
      </div>
    </MeLayout>
  );
}

export default Index;
