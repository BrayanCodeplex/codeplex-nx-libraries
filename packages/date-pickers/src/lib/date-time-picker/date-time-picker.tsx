import React from 'react';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';

export interface CodeplexDateTimePickerProps extends DateTimePickerProps<Dayjs> {
    // Vitamins:
    helperText?: string;
    error?: boolean;
    fullWidth?: boolean;
}

export const CodeplexDateTimePicker = ({
    slotProps,
    helperText,
    error,
    fullWidth = true, // Vitamin: Default full width
    sx,
    ...props
}: CodeplexDateTimePickerProps) => {
    return (
        <DateTimePicker
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
