import { RxLapTimer } from "react-icons/rx";
import { MdLocalGasStation } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";


function StatsBox({ time, liters, km }: { time: number, liters?: number, km?: number }) {
    return (
        <>
            <table className="table-fixed border-2 border-honda border-solid border-collapse mt-4 font-oswald">
                <tbody>
                    <tr>
                        <td className="p-2 w-1/3 text-center text-honda font-semibold border-2 border-honda border-solid">
                            <RxLapTimer color="#ea3323" />
                            <p>{time}h</p>
                        </td>
                        {liters ? (
                            <td className="p-2 w-1/3 text-center text-honda font-semibold border-2 border-honda border-solid">
                                <MdLocalGasStation color="#ea3323" />
                                <p>{liters}L</p>
                            </td>
                        ) :""}
                        {km ? (
                            <td className="p-2 w-1/3 text-center text-honda font-semibold border-2 border-honda border-solid">
                                <GiPathDistance color="#ea3323" />
                                <p>{km}Km</p>
                            </td>
                        ) : ""}
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default StatsBox