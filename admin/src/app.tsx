import './global.css';

import { useEffect } from 'react';

import { usePathname } from './theme/routes/hooks';

import { ThemeProvider } from './theme/theme/theme-provider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/it';

// ----------------------------------------------------------------------

type AppProps = {
    children: React.ReactNode;
};

export default function App({ children }: AppProps) {
    useScrollToTop();


    return (
        <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='it'>
                {children}
            </LocalizationProvider>
        </ThemeProvider>
    );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
