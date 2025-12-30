import React from 'react';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';

export interface CodeplexTimePickerProps extends TimePickerProps {
    // Vitamins:
    helperText?: string;
    error?: boolean;
    fullWidth?: boolean;
}

export const CodeplexTimePicker = ({
    slotProps,
    helperText,
    error,
    fullWidth = true, // Vitamin: Default full width
    sx,
    ...props
}: CodeplexTimePickerProps) => {
    return (
        <TimePicker
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
