import dayjs from "dayjs";
import { Trip } from "../../features/trips/types";
import { WidgetSummary } from "../widgets/WidgetSummary";
import "dayjs/locale/it";
import { ReactNode } from "react";
import { PaletteColorKey } from "../../theme/theme";

const PREZZO_BENZINA = 1.7;

dayjs.locale("it");

// eslint-disable-next-line react-refresh/only-export-components
export enum NumericWidgetType {
  km,
  liters,
  euros,
  hours,
}

function NumericWidget({
  title,
  color,
  trips,
  field,
  icon,
}: {
  title: string;
  color: PaletteColorKey;
  trips?: Trip[];
  field: NumericWidgetType;
  icon: ReactNode;
}) {
  const now = dayjs();
  const monthLabels: string[] = [];
  const monthMap = new Map<string, number>();

  for (let i = 7; i >= 0; i--) {
    const d = now.subtract(i, "month");
    const label = d.format("MMM YY");
    const key = d.format("YYYY-MM");
    monthLabels.push(label);
    monthMap.set(key, 0);
  }

  if (trips) {
    for (const trip of trips) {
      const key = dayjs(trip.start).format("YYYY-MM");
      if (key) {
        if (monthMap.has(key)) {
          switch (field) {
            case NumericWidgetType.km:
              monthMap.set(key, (monthMap.get(key) || 0) + trip.km);
              break;

            case NumericWidgetType.liters:
              monthMap.set(key, (monthMap.get(key) || 0) + trip.liters);
              break;

            case NumericWidgetType.euros:
              monthMap.set(
                key,
                (monthMap.get(key) || 0) + trip.liters * PREZZO_BENZINA,
              );
              break;

            case NumericWidgetType.hours:
              monthMap.set(
                key,
                (monthMap.get(key) || 0) +
                  dayjs(trip.end).diff(trip.start, "hour", true),
              );
              break;
          }
        }
      }
    }
  }

  const series = Array.from(monthMap.values());

  const result = {
    categories: monthLabels,
    series: series,
  };

  const valorePrecedente = series[series.length - 2];
  const valoreCorrente = series[series.length - 1];

  let percentuale: number;

  if (valorePrecedente === 0) {
    percentuale = valoreCorrente === 0 ? 0 : 100;
  } else {
    percentuale =
      ((valoreCorrente - valorePrecedente) / valorePrecedente) * 100;
  }

  let unit = "";
  switch (field) {
    case NumericWidgetType.km:
      unit += "km";
      break;
    case NumericWidgetType.liters:
      unit += "L";
      break;
    case NumericWidgetType.euros:
      unit += "€";
      break;
    case NumericWidgetType.hours:
      unit += "h";
      break;
  }

  return (
    <WidgetSummary
      title={title}
      color={color}
      percent={percentuale}
      total={result.series.reduce((sum, value) => sum + value, 0)}
      icon={icon}
      unit={unit}
      chart={result}
    />
  );
}

export default NumericWidget;
