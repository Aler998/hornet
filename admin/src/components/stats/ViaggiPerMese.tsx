import dayjs from "dayjs";
import { BarChartVertical } from "../widgets/BarChartVertical";
import { Trip } from "../../features/trips/types";

function ViaggiPerMese({ trips }: { trips?: Trip[] }) {
  const oggi = dayjs();
  const monthsToShow = 8;

  // Categorie: ultimi 8 mesi (più il corrente), da sinistra verso destra
  const categories: string[] = [];
  const currentMonths: number[] = [];
  for (let i = monthsToShow - 1; i >= 0; i--) {
    const month = oggi.subtract(i, "month");
    categories.push(month.format("MMM")); // "Jan", "Feb", ecc.
    currentMonths.push(month.month()); // numeri da 0 (gennaio) a 11 (dicembre)
  }

  const currentYear = oggi.year();
  const lastYear = currentYear - 1;

  // Inizializza contatori: ogni posizione rappresenta un mese specifico
  const countsCurrent = Array(monthsToShow).fill(0);
  const countsLast = Array(monthsToShow).fill(0);

  if (trips) {
    for (const trip of trips) {
      const tripYear = dayjs(trip.start).year();
      const tripMonth = dayjs(trip.start).month(); // 0-11

      for (let i = 0; i < monthsToShow; i++) {
        if (tripMonth === currentMonths[i]) {
          if (tripYear === currentYear) {
            countsCurrent[i]++;
          } else if (tripYear === lastYear) {
            countsLast[i]++;
          }
          break;
        }
      }
    }
  }

  const result = {
    categories,
    series: [
      { name: String(lastYear), data: countsLast },
      { name: String(currentYear), data: countsCurrent },
    ],
  };

  const totalCurrent = countsCurrent.reduce((a, b) => a + b, 0);
  const totalLast = countsLast.reduce((a, b) => a + b, 0);

  return (
    <BarChartVertical
      title="Viaggi per mese"
      subheader={`+${totalCurrent-totalLast} rispetto allo scorso anno`}
      chart={result}
    />
  );
}

export default ViaggiPerMese;
