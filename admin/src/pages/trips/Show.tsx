import { useNavigate, useParams } from "react-router-dom";
import { useGetTripQuery } from "../../features/trips/tripsApi";
import { DashboardContent } from "../../theme/layouts/dashboard"
import { Stack, Typography } from "@mui/material";
import GPXMap from "../../components/maps/GPXMap";
import Loader from "../../components/Loader";
import { useEffect } from "react";

function Show() {
    const { slug } = useParams<{ slug: string }>();
    const { data: trip, isLoading, isError, error } = useGetTripQuery(slug!);
    const navigate = useNavigate();

    useEffect(() => {
        if (isError && error && "status" in error && error.status === 404) {
            navigate(`/${import.meta.env.VITE_SUBFOLDER}/404`);
        }
    }, [isError, error, navigate]);

    if (isLoading) return <Loader />
    return (
        <>
            <title>{`Viaggi`}</title>

            <DashboardContent>
                {trip ? (
                    <Stack>
                        <Typography>{trip.title}</Typography>
                        {trip.decodedTracks?.map((decodedTrack) => (<GPXMap serverData={decodedTrack} />))}
                    </Stack>
                ) : (<p>Errore nel caricamento</p>)}

            </DashboardContent>
        </>
    )
}

export default Show