import { useState } from 'react';
import { CodeplexStepper, CodeplexButton, CodeplexCard, CodeplexBox, CodeplexStack } from '@codeplex-sac/libraries'; // Assuming export barrel or use individual
// Fallback if not updated yet in barrel:
import { CodeplexStepper as StepperComponent } from '@codeplex-sac/navigation';
import { CodeplexButton as ButtonComponent, CodeplexCard as CardComponent } from '@codeplex-sac/ui';
import { CodeplexBox as BoxComponent, CodeplexStack as StackComponent } from '@codeplex-sac/layout';

export const StepperPage = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { label: 'Select campaign settings' },
        { label: 'Create an ad group' },
        { label: 'Create an ad' },
    ];

    const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length));
    const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));
    const handleReset = () => setActiveStep(0);

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Stepper</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Indicador de progreso secuencial. Vitaminado con <code>steps</code> array.
                </p>
            </div>

            <CardComponent header="Stepper Horizontal Básico">
                <BoxComponent sx={{ p: 4, width: '100%' }}>
                    <StepperComponent activeStep={activeStep} steps={steps} />

                    <BoxComponent sx={{ mt: 4, mb: 1, display: 'flex', flexDirection: 'row', width: '100%' }}>
                        {activeStep === steps.length ? (
                            <StackComponent direction="row" spacing={2} centered sx={{ pt: 2, width: '100%' }}>
                                <p>All steps completed - you're finished</p>
                                <ButtonComponent onClick={handleReset}>Reset</ButtonComponent>
                            </StackComponent>
                        ) : (
                            <BoxComponent sx={{ display: 'flex', flexDirection: 'row', pt: 2, width: '100%', justifyContent: 'space-between' }}>
                                <ButtonComponent
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant="secondary"
                                >
                                    Back
                                </ButtonComponent>
                                <ButtonComponent onClick={handleNext} variant="primary">
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </ButtonComponent>
                            </BoxComponent>
                        )}
                    </BoxComponent>
                </BoxComponent>
            </CardComponent>

            <CardComponent header="Stepper Alternativo (Labels abajo)">
                <BoxComponent sx={{ p: 4 }}>
                    <StepperComponent
                        activeStep={activeStep}
                        steps={steps}
                        alternativeLabel
                    />
                </BoxComponent>
            </CardComponent>
        </div>
    );
};
