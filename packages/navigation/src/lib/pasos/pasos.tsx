import React from 'react';
import { Stepper, Step, StepLabel, StepperProps, StepButton, Typography } from '@mui/material';

export interface CodeplexPaso {
    etiqueta: string;
    leyenda?: string; // Optional caption
    opcional?: boolean; // Label "Optional"
    error?: boolean; // Show error state
    completado?: boolean;
}

export interface CodeplexPasosProps extends Omit<StepperProps, 'activeStep' | 'alternativeLabel' | 'nonLinear'> {
    pasos: CodeplexPaso[];
    pasoActivo: number;
    // Vitamins:
    etiquetaAlternativa?: boolean; // Labels below icons
    noLineal?: boolean; // Allow clicking steps
    alHacerClickPaso?: (index: number) => void;
}

export const CodeplexPasos = ({
    pasos,
    pasoActivo,
    etiquetaAlternativa,
    noLineal,
    alHacerClickPaso,
    ...props
}: CodeplexPasosProps) => {

    return (
        <Stepper activeStep={pasoActivo} alternativeLabel={etiquetaAlternativa} nonLinear={noLineal} {...props}>
            {pasos.map((paso, index) => {
                const stepProps: { completed?: boolean; error?: boolean } = {};
                const labelProps: { optional?: React.ReactNode; error?: boolean } = {};

                if (paso.completado !== undefined) {
                    stepProps.completed = paso.completado;
                }

                if (paso.error) {
                    labelProps.error = true;
                }

                if (paso.opcional) {
                    labelProps.optional = (
                        <Typography variant="caption" color="text.secondary" display="block">Opcional</Typography>
                    );
                }

                // If nonLinear and onStepClick is provided, use StepButton for interactivity
                if (noLineal && alHacerClickPaso) {
                    return (
                        <Step key={paso.etiqueta} {...stepProps}>
                            <StepButton color="inherit" onClick={() => alHacerClickPaso(index)} optional={paso.opcional ? "Opcional" : undefined}>
                                {paso.etiqueta}
                            </StepButton>
                        </Step>
                    );
                }

                return (
                    <Step key={paso.etiqueta} {...stepProps}>
                        <StepLabel {...labelProps}>{paso.etiqueta}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
};
