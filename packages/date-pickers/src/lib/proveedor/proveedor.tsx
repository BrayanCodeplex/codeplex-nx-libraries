import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es'; // Default spanish locale as vitamin
import dayjs from 'dayjs';

// Initialize default locale
dayjs.locale('es');

export interface CodeplexProveedorFechasProps {
    children: React.ReactNode;
    idioma?: string;
}

export const CodeplexProveedorFechas = ({ children, idioma = 'es' }: CodeplexProveedorFechasProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={idioma}>
            {children}
        </LocalizationProvider>
    );
};

