import { useState } from 'react';
import { CodeplexTextField, CodeplexCard, CodeplexButton } from '@codeplex-qwik/ui';
import { CodeplexGrid } from '@codeplex-qwik/layout';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const TextFieldPage = () => {
    const [name, setName] = useState('Cat in the Hat');
    const [showPassword, setShowPassword] = useState(false);

    // Form Validation State
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const validateEmail = (value: string) => {
        setEmail(value);
        if (!value) {
            setEmailError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (value: string) => {
        setPassword(value);
        if (!value) {
            setPasswordError('Password is required');
        } else if (value.length < 8) {
            setPasswordError('Password must be at least 8 characters');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validateEmail(email);
        validatePassword(password);
        if (email && password && !emailError && !passwordError) {
            alert('Login successful!');
        }
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Text Field</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Campos de texto con diseño moderno, estados de validación y adornos.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Professional Validation Form</h2>

                <CodeplexGrid container spacing={4} alignItems="flex-start">
                    <CodeplexGrid size={{ xs: 12, md: 6 }}>
                        <CodeplexCard>
                            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Login Account</h3>
                                    <p className="text-sm text-gray-500 mb-4">Enter your credentials to access the dashboard.</p>
                                </div>

                                <CodeplexTextField
                                    label="Email Address"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => validateEmail(e.target.value)}
                                    error={!!emailError}
                                    helperText={emailError || "We'll never share your email."}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon color={emailError ? "error" : "action"} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />

                                <CodeplexTextField
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => validatePassword(e.target.value)}
                                    error={!!passwordError}
                                    helperText={passwordError || "Must be at least 8 characters."}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon color={passwordError ? "error" : "action"} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                        onMouseDown={(e) => e.preventDefault()}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />

                                <div className="mt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-lg shadow-blue-600/20"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </Box>

                        </CodeplexCard>
                    </CodeplexGrid>

                    <CodeplexGrid size={{ xs: 12, md: 6 }}>
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                            <Typography variant="subtitle2" className="text-blue-800 dark:text-blue-300 font-semibold mb-2">
                                UX Best Practices Applied:
                            </Typography>
                            <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-400 space-y-1">
                                <li>Real-time validation feedback</li>
                                <li>Contextual helper text</li>
                                <li>Visual cues (icons change color on error)</li>
                                <li>Smooth focus rings and transitions</li>
                                <li>Subtle background tints for active states</li>
                            </ul>
                        </div>

                    </CodeplexGrid>
                </CodeplexGrid>
            </section >

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">States & Variants</h2>
                <CodeplexGrid container spacing={2}>
                    <CodeplexGrid size={{ xs: 12, md: 6, lg: 3 }}>
                        <CodeplexTextField label="Standard Outlined" fullWidth />
                    </CodeplexGrid>
                    <CodeplexGrid size={{ xs: 12, md: 6, lg: 3 }}>
                        <CodeplexTextField label="Disabled" disabled defaultValue="Locked" fullWidth />
                    </CodeplexGrid>
                    <CodeplexGrid size={{ xs: 12, md: 6, lg: 3 }}>
                        <CodeplexTextField label="Read Only" defaultValue="Read Only" slotProps={{ input: { readOnly: true } }} fullWidth />
                    </CodeplexGrid>
                    <CodeplexGrid size={{ xs: 12, md: 6, lg: 3 }}>
                        <CodeplexTextField label="Error State" error defaultValue="Invalid" helperText="Please fix this" fullWidth />
                    </CodeplexGrid>
                </CodeplexGrid>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Multiline</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexTextField
                        label="Bio / Description"
                        multiline
                        minRows={3}
                        placeholder="Tell us about yourself..."
                        fullWidth
                    />
                </div>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código (Validation Logic)
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`const validateEmail = (value) => {
  if (!/\\S+@\\S+\\.\\S+/.test(value)) {
    setEmailError('Please enter a valid email address');
  } else {
    setEmailError('');
  }
};

<CodeplexTextField
  label="Email"
  error={!!emailError}
  helperText={emailError || "Helper text"}
  onChange={(e) => validateEmail(e.target.value)}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div >
    );
};
