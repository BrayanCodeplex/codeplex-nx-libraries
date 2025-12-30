import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

export interface CodeplexDatePickerProps extends DatePickerProps<Dayjs> {
    // Vitamins:
    helperText?: string;
    error?: boolean;
    fullWidth?: boolean;
}

export const CodeplexDatePicker = ({
    slotProps,
    helperText,
    error,
    fullWidth = true, // Vitamin: Default full width
    sx,
    ...props
}: CodeplexDatePickerProps) => {
    return (
        <DatePicker
            slotProps={{
                ...slotProps,
                textField: {
                    ...slotProps?.textField,
                    helperText: helperText,
                    error: error,
                    fullWidth: fullWidth,
                }
            }}
            sx={{ width: fullWidth ? '100%' : undefined, ...sx }}
            {...props}
        />
    );
};
