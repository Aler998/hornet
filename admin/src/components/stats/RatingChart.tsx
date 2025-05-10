import dayjs from "dayjs";
import { Trip } from "../../features/trips/types";
import { BarChart } from "../widgets/BarChart";

function RatingChart({ trips }: { trips?: Trip[] }) {
  const categories = ["5★", "4★", "3★", "2★", "1★"];
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const countsCurrent = Array(5).fill(0); 
  const countsLast = Array(5).fill(0);

  if (trips) {
    
      for (const trip of trips) {
        const year = dayjs(trip.start).year();
        const voto = trip.rating;
    
        if (voto < 1 || voto > 5) continue;
    
        if (year === currentYear) {
          countsCurrent[voto - 1]++;
        } else if (year === lastYear) {
          countsLast[voto - 1]++;
        }
      }
  }

  const result = {
    categories,
    series: [
        { name: String(currentYear), data: countsCurrent.reverse() },
        { name: String(lastYear), data: countsLast.reverse() },
    ],
  };

  return (
    <BarChart title="Voti" subheader="(+43%) than last year" chart={result} />
  );
}

export default RatingChart;
