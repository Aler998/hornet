import dayjs from "dayjs";
import { Trip } from "../../features/trips/types";
import { TimelineWidget } from "../widgets/TimelineWidget";

interface ListProps {
  id: string;
  type: string;
  title: string;
  time: string | number | null;
}

function UltimiViaggi({ trips }: { trips?: Trip[] }) {
  const list: ListProps[] = trips
    ? [...trips]
        .sort((a, b) => dayjs(b.start).valueOf() - dayjs(a.start).valueOf())
        .map((trip, i) => {
          return {
            id: `ultimi-viaggi-${i}`,
            type:
              trip.rating >= 4
                ? "order1"
                : trip.rating == 3
                  ? "order2"
                  : trip.rating == 2
                    ? "order3"
                    : "order4",
            title: trip.title,
            time: `${dayjs(trip.start).format("ddd DD MMM YY HH::mm")} - ${dayjs(trip.end).format("ddd DD MMM YY HH::mm")}`,
          };
        })
        .slice(0, 5)
    : [
        {
          id: `ultimi-viaggi`,
          type: "warning",
          title: "Nessun viaggio",
          time: "",
        },
      ];

  return <TimelineWidget title="Ultimi Viaggi" list={list} />;
}

export default UltimiViaggi;
