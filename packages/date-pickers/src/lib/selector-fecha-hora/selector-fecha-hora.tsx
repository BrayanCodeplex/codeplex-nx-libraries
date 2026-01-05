import React from 'react';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';

export interface CodeplexSelectorFechaHoraProps extends Omit<DateTimePickerProps<Dayjs>, 'label'> {
    // Spanish
    textoAyuda?: string;
    error?: boolean;
    anchoCompleto?: boolean;
    etiqueta?: string;
}

export const CodeplexSelectorFechaHora = ({
    slotProps,
    textoAyuda,
    error,
    anchoCompleto = true,
    etiqueta,
    sx,
    ...props
}: CodeplexSelectorFechaHoraProps) => {
    return (
        <DateTimePicker
            label={etiqueta}
            slotProps={{
                ...slotProps,
                textField: {
                    ...slotProps?.textField,
                    helperText: textoAyuda,
                    error: error,
                    fullWidth: anchoCompleto,
                }
            }}
            sx={{ width: anchoCompleto ? '100%' : undefined, ...sx }}
            {...props}
        />
    );
};

