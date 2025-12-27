import React from 'react';
import Autocomplete, { AutocompleteProps, AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { ChipTypeMap } from '@mui/material/Chip';

// Define generic type T for options
export interface CodeplexAutocompleteProps<
    T,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined
> extends Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> {
    // Support custom input rendering props
    label?: string;
    placeholder?: string;
    helperText?: string;
    error?: boolean;
    required?: boolean;
    inputProps?: TextFieldProps;
    // Optional custom renderInput override
    renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

export function CodeplexAutocomplete<
    T,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined
>({
    label,
    placeholder,
    helperText,
    error,
    required,
    inputProps,
    renderInput,
    ...props
}: CodeplexAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {

    const defaultRenderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            error={error}
            required={required}
            {...inputProps}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#fff',
                    paddingRight: '30px', // Prevent overlap with clear/popup icons
                    '& fieldset': {
                        borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : '#e2e8f0',
                        borderWidth: '1px',
                    },
                    '&:hover fieldset': {
                        borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : '#94a3b8',
                    },
                    '&.Mui-focused': {
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#fff',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                            ? '0 4px 12px 0 rgba(0,0,0,0.4)' // Subtle shadow on dark
                            : '0 4px 12px 0 rgba(0,0,0,0.05)', // Subtle shadow on light
                    },
                    '&.Mui-focused fieldset': {
                        borderWidth: '2px',
                        borderColor: 'primary.main',
                    },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                    fontWeight: 600,
                },
                ...inputProps?.sx
            }}
        />
    );

    return (
        <Autocomplete
            renderInput={renderInput || defaultRenderInput}
            PaperComponent={(paperProps) => (
                <Paper
                    {...paperProps}
                    elevation={4}
                    sx={{
                        borderRadius: '16px',
                        marginTop: '8px',
                        border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'}`,
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                            ? '0 10px 40px -10px rgba(0,0,0,0.6)'
                            : '0 12px 30px -10px rgba(0,0,0,0.12)',
                        overflow: 'hidden',
                        '& .MuiAutocomplete-listbox': {
                            padding: '8px',
                            '& .MuiAutocomplete-option': {
                                borderRadius: '10px',
                                margin: '2px 0',
                                padding: '10px 14px',
                                transition: 'all 0.15s ease',
                                fontSize: '0.9rem',
                                '&[aria-selected="true"]': {
                                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(var(--mui-palette-primary-mainChannel), 0.15)'
                                        : 'rgba(var(--mui-palette-primary-mainChannel), 0.08)',
                                    color: 'primary.main',
                                    fontWeight: 600,
                                    '&.Mui-focused': {
                                        backgroundColor: (theme) => theme.palette.mode === 'dark'
                                            ? 'rgba(var(--mui-palette-primary-mainChannel), 0.25)'
                                            : 'rgba(var(--mui-palette-primary-mainChannel), 0.15)',
                                    }
                                },
                                '&:hover': {
                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                                    transform: 'translateX(2px)', // Subtle movement
                                }
                            },
                            '& .MuiAutocomplete-noOptions': {
                                color: 'text.secondary',
                                padding: '16px',
                                textAlign: 'center',
                                fontSize: '0.9rem'
                            }
                        }
                    }}
                />
            )}
            {...props}
        />
    );
}
