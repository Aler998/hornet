import { useNavigate, useParams } from "react-router-dom"
import { useGetTripQuery } from "../features/trips/tripsApi"
import "react-image-gallery/styles/css/image-gallery.css";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { Trip as ITrip } from "../features/trips/types";
import { HomeContent, homeNav } from "../components/TripSections/Home";
import { GalleryContent, galleryNav } from "../components/TripSections/Gallery";
import { MapsContent, mapsNav } from "../components/TripSections/Maps";
import Layout, { templates } from "../components/Layout/Layout";



function Trip() {
    const { slug } = useParams<{ slug: string }>()
    const { data: trip, isLoading, isError, error } = useGetTripQuery(slug!)
    const navigate = useNavigate()
    
    const tabs = [homeNav, galleryNav, mapsNav]
    const [selectedTab, setSelectedTab] = useState(tabs[0])
    



    const renderTab = (tab: string, trip: ITrip) => {
        switch (tab) {
            case 'details':
                return <HomeContent trip={trip} />;
            case 'gallery':
                return <GalleryContent trip={trip} />;
            case 'maps':
                return <MapsContent trip={trip} />;
            default:
                return <p>Unknown status</p>;
        }
    };

    useEffect(() => {
        if (isError && error && typeof error === 'object' && 'status' in error) {
            const status = (error as { status: number }).status;
            navigate(`/${status}`);
        }
    }, [isError, error, navigate])



    if (trip) {

        return (
            <Layout template={templates.clear} isLoading={isLoading} >
                <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]"></div>

                <div className="w-full h-screen max-h-screen overflow-hidden text-neutral-700 dark:text-white">

                    <main>
                        <AnimatePresence mode="wait">
                            <motion.div
                                className="w-full h-[calc(100vh-var(--navbar-height))] flex flex-col justify-center items-center"
                                key={selectedTab.label ? selectedTab.label : "empty"}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderTab(selectedTab.label, trip)}

                            </motion.div>
                        </AnimatePresence>
                    </main>
                    <nav className="w-full h-[var(--navbar-height)] relative inset-shadow-sm inset-shadow-honda flex items-center justify-center">
                        <ul className="flex justify-center items-center list-none">
                            {tabs.map((item) => (
                                <motion.li
                                    key={item.label}
                                    className="list-style-none relative pb-4"
                                    initial={false}
                                    animate={{
                                        color:
                                            item === selectedTab ? "#ea3323" : "#000",
                                    }}
                                    onClick={() => setSelectedTab(item)}
                                >
                                    {item.nav}
                                    {item === selectedTab ? (
                                        <motion.div
                                            style={underline}
                                            layoutId="underline"
                                            id="underline"
                                        />
                                    ) : null}
                                </motion.li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </Layout>
        )
    }
}

const underline: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    background: "var(--honda)",
}

export default Trip