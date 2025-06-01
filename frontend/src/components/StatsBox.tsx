import { RxLapTimer } from "react-icons/rx";
import { MdLocalGasStation } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { BiTachometer } from "react-icons/bi";
import { formatMinutes } from "../utils/format-date";

function StatsBox({
  time,
  liters,
  km,
  velocity,
}: {
  time: number;
  liters?: number;
  km?: number;
  velocity?: number;
}) {
  return (
    <>
      <table className="table-fixed border-2 border-gray-600 border-solid border-collapse mt-4 font-oswald mb-4">
        <tbody>
          <tr>
            <td className="p-2 w-1/4 text-center text-gray-600 font-semibold border-2 border-gray-600 border-solid">
              <RxLapTimer className="text-gray-600" />
              <p>{formatMinutes(time)}</p>
            </td>
            {km ? (
              <td className="p-2 w-1/4 text-center text-gray-600 font-semibold border-2 border-gray-600 border-solid">
                <GiPathDistance className="text-gray-600" />
                <p>{km}Km</p>
              </td>
            ) : (
              ""
            )}
            {velocity ? (
              <td className="p-2 w-1/4 text-center text-gray-600 font-semibold border-2 border-gray-600 border-solid">
                <BiTachometer className="text-gray-600" />
                <p>{velocity}Km/h</p>
              </td>
            ) : (
              ""
            )}
            {liters ? (
              <td className="p-2 w-1/4 text-center text-gray-600 font-semibold border-2 border-gray-600 border-solid">
                <MdLocalGasStation className="text-gray-600" />
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
