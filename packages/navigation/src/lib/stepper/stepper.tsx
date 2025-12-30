import React from 'react';
import { Stepper, Step, StepLabel, StepperProps, StepButton, Typography } from '@mui/material';

export interface CodeplexStep {
    label: string;
    caption?: string; // Optional caption
    optional?: boolean; // Label "Optional"
    error?: boolean; // Show error state
    completed?: boolean;
}

export interface CodeplexStepperProps extends StepperProps {
    steps: CodeplexStep[];
    activeStep: number;
    // Vitamins:
    alternativeLabel?: boolean; // Labels below icons
    nonLinear?: boolean; // Allow clicking steps
    onStepClick?: (index: number) => void;
}

export const CodeplexStepper = ({
    steps,
    activeStep,
    alternativeLabel,
    nonLinear,
    onStepClick,
    ...props
}: CodeplexStepperProps) => {

    return (
        <Stepper activeStep={activeStep} alternativeLabel={alternativeLabel} nonLinear={nonLinear} {...props}>
            {steps.map((step, index) => {
                const stepProps: { completed?: boolean; error?: boolean } = {};
                const labelProps: { optional?: React.ReactNode; error?: boolean } = {};

                if (step.completed !== undefined) {
                    stepProps.completed = step.completed;
                }

                if (step.error) {
                    labelProps.error = true;
                }

                if (step.optional) {
                    labelProps.optional = (
                        <Typography variant="caption" color="text.secondary" display="block">Optional</Typography>
                    );
                }

                // If nonLinear and onStepClick is provided, use StepButton for interactivity
                if (nonLinear && onStepClick) {
                    return (
                        <Step key={step.label} {...stepProps}>
                            <StepButton color="inherit" onClick={() => onStepClick(index)} optional={step.optional ? "Optional" : undefined}>
                                {step.label}
                            </StepButton>
                        </Step>
                    );
                }

                return (
                    <Step key={step.label} {...stepProps}>
                        <StepLabel {...labelProps}>{step.label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
};
