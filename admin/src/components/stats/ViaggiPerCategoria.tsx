import { Category } from "../../features/categories/types";
import { Trip } from "../../features/trips/types";
import { GraficoTorta } from "../widgets/GraficoTorta";

const ViaggiPerCategoria = ({
  trips,
  categories,
}: {
  trips?: Trip[];
  categories?: Category[];
}) => {
  const viaggiPerCategoria = categories
    ? categories?.map((category) => {
        return {
          label: category.title,
          value: trips
            ? trips?.filter((trip) => trip.category === category._id).length
            : 0,
        };
      })
    : [{ label: "Non esistono categorie", value: 1 }];

  return (
    <GraficoTorta
      title="Viaggi Per Categoria"
      chart={{
        series: viaggiPerCategoria,
      }}
    />
  );
};

export default ViaggiPerCategoria;
