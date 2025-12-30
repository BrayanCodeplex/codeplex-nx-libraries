import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es'; // Default spanish locale as vitamin
import dayjs from 'dayjs';

// Initialize default locale
dayjs.locale('es');

export interface CodeplexDatesProviderProps {
    children: React.ReactNode;
    adapterLocale?: string;
}

export const CodeplexDatesProvider = ({ children, adapterLocale = 'es' }: CodeplexDatesProviderProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={adapterLocale}>
            {children}
        </LocalizationProvider>
    );
};
