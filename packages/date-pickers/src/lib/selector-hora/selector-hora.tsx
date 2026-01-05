import React from 'react';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';

export interface CodeplexSelectorHoraProps extends Omit<TimePickerProps<Dayjs>, 'label'> {
    // Spanish
    textoAyuda?: string;
    error?: boolean;
    anchoCompleto?: boolean;
    etiqueta?: string;
}

export const CodeplexSelectorHora = ({
    slotProps,
    textoAyuda,
    error,
    anchoCompleto = true,
    etiqueta,
    sx,
    ...props
}: CodeplexSelectorHoraProps) => {
    return (
        <TimePicker
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

