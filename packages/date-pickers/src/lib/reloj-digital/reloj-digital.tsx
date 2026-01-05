import React from 'react';
import { DigitalClock, DigitalClockProps } from '@mui/x-date-pickers/DigitalClock';
import { Dayjs } from 'dayjs';
import { Paper, SxProps, Theme } from '@mui/material';

export interface CodeplexRelojDigitalProps extends DigitalClockProps<Dayjs> {
    conPapel?: boolean;
    sx?: SxProps<Theme>;
}

export const CodeplexRelojDigital = ({ conPapel = true, sx, ...props }: CodeplexRelojDigitalProps) => {
    // DigitalClock might strictly not accept sx in its props definition depending on version, 
    // but the component usually passes it down or handles it. 
    // We cast to any to avoid strict type error if sx is missing from DigitalClockProps, 
    // or we assume it works at runtime.
    const clock = <DigitalClock {...props} sx={sx} />;

    if (conPapel) {
        return (
            <Paper elevation={2} sx={{ width: 'fit-content', ...sx }}>
                <DigitalClock {...props} />
            </Paper>
        );
    }

    return clock;
};

