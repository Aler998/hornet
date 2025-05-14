import { RxLapTimer } from "react-icons/rx";
import { MdLocalGasStation } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { BiTachometer } from "react-icons/bi";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";

// Abilita il plugin duration
dayjs.extend(duration);

function StatsBox({
  start,
  end,
  liters,
  km,
  velocity,
}: {
  start: Dayjs | null;
  end: Dayjs | null;
  liters?: number;
  km?: number;
  velocity?: number;
}) {
  const renderTime = () => {
    if (start && end) {
      // Differenza in millisecondi
      const diffMs = dayjs(end).diff(dayjs(start));

      // Converti in durata
      const dur = dayjs.duration(diffMs);

      // Estrai ore e minuti
      const ore = Math.floor(dur.asHours());
      const minuti = dur.minutes();
      return (
        <p>
          {ore}h{minuti}min
        </p>
      );
    } else {
      return <p></p>;
    }
  };
  return (
    <>
      <table className="table-fixed border-2 border-honda border-solid border-collapse mt-4 font-oswald mb-4">
        <tbody>
          <tr>
            <td className="p-2 w-1/4 text-center text-honda font-semibold border-2 border-honda border-solid">
              <RxLapTimer color="#ea3323" />
              {renderTime()}
            </td>
            {km ? (
              <td className="p-2 w-1/4 text-center text-honda font-semibold border-2 border-honda border-solid">
                <GiPathDistance color="#ea3323" />
                <p>{km}Km</p>
              </td>
            ) : (
              ""
            )}
            {velocity ? (
              <td className="p-2 w-1/4 text-center text-honda font-semibold border-2 border-honda border-solid">
                <BiTachometer color="#ea3323" />
                <p>{velocity}Km/h</p>
              </td>
            ) : (
              ""
            )}
            {liters ? (
              <td className="p-2 w-1/4 text-center text-honda font-semibold border-2 border-honda border-solid">
                <MdLocalGasStation color="#ea3323" />
                <p>{(Math.round(liters * 100) / 100).toFixed(2)}L</p>
              </td>
            ) : (
              ""
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default StatsBox;
