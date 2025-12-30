import React from 'react';
import { DigitalClock, DigitalClockProps } from '@mui/x-date-pickers/DigitalClock';
import { Dayjs } from 'dayjs';
import { Box, Paper } from '@mui/material';

export interface CodeplexDigitalClockProps extends DigitalClockProps {
    withPaper?: boolean;
}

export const CodeplexDigitalClock = ({ withPaper = true, sx, ...props }: CodeplexDigitalClockProps) => {
    const clock = <DigitalClock {...props} sx={sx} />;

    if (withPaper) {
        return (
            <Paper elevation={2} sx={{ width: 'fit-content', ...sx }}>
                {clock}
            </Paper>
        );
    }

    return clock;
};
