import ThemeSwitcher from '../ThemeSwitcher'
import Logo from '../Logo'
import Rating from '../Rating'
import StatsBox from '../StatsBox'
import { Trip } from '../../features/trips/types'
import dayjs from 'dayjs'
import { MdSpaceDashboard } from 'react-icons/md'

export const homeNav = {
    label: "details",
    nav: <span className="mx-2 flex items-center font-oswald font-semibold text-lg cursor-pointer"><MdSpaceDashboard className="mr-2" /> Home</span>
}

export function HomeContent({ trip }: { trip: Trip }) {
    return (
        <>
            <div className='absolute top-8 right-4'>
                <ThemeSwitcher />
            </div>
            <Logo classes="w-20 h-20" />
            <h1 className="font-oswald text-6xl my-4 dark:text-honda">{trip.title}</h1>
            <Rating voto={trip.rating} placeItems="place-items-center" dimensions="w-8 h-8" />
            <p className="font-oswald font-semibold p-2">{trip.description}</p>
            <StatsBox time={dayjs(trip.end).diff(trip.start, 'hour', false)} liters={trip.liters} km={trip.km}/>
        </>
    )
}

