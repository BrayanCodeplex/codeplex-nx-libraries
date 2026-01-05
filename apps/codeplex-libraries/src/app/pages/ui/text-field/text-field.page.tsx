import { useState } from 'react';
import { CodeplexCampoTexto, CodeplexTarjeta } from '@codeplex-sac/ui';
import { CodeplexCuadricula } from '@codeplex-sac/layout';
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
            setEmailError('El correo es obligatorio');
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            setEmailError('Por favor ingrese un correo válido');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (value: string) => {
        setPassword(value);
        if (!value) {
            setPasswordError('La contraseña es obligatoria');
        } else if (value.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validateEmail(email);
        validatePassword(password);
        if (email && password && !emailError && !passwordError) {
            alert('Inicio de sesión exitoso!');
        }
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Campo de Texto (Text Field)</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Campos de texto con diseño moderno, estados de validación y adornos.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Formulario con Validación</h2>

                <CodeplexCuadricula contenedor espaciado={4} alignItems="flex-start">
                    <CodeplexCuadricula elemento xs={12} md={6}>
                        <CodeplexTarjeta>
                            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Iniciar Sesión</h3>
                                    <p className="text-sm text-gray-500 mb-4">Ingrese sus credenciales para acceder al panel.</p>
                                </div>

                                <CodeplexCampoTexto
                                    etiqueta="Correo Electrónico"
                                    placeholder="juan@ejemplo.com"
                                    value={email}
                                    onChange={(e) => validateEmail(e.target.value)}
                                    error={!!emailError}
                                    textoAyuda={emailError || "Nunca compartiremos tu correo."}
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

                                <CodeplexCampoTexto
                                    etiqueta="Contraseña"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => validatePassword(e.target.value)}
                                    error={!!passwordError}
                                    textoAyuda={passwordError || "Debe tener al menos 8 caracteres."}
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
                                                        aria-label="cambiar visibilidad contraseña"
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
                                        Iniciar Sesión
                                    </button>
                                </div>
                            </Box>

                        </CodeplexTarjeta>
                    </CodeplexCuadricula>

                    <CodeplexCuadricula elemento xs={12} md={6}>
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                            <Typography variant="subtitle2" className="text-blue-800 dark:text-blue-300 font-semibold mb-2">
                                Mejores Prácticas de UX Aplicadas:
                            </Typography>
                            <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-400 space-y-1">
                                <li>Retroalimentación de validación en tiempo real</li>
                                <li>Texto de ayuda contextual</li>
                                <li>Señales visuales (los íconos cambian de color al haber error)</li>
                                <li>Anillos de enfoque y transiciones suaves</li>
                                <li>Fondos sutiles para estados activos</li>
                            </ul>
                        </div>

                    </CodeplexCuadricula>
                </CodeplexCuadricula>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Estados y Variantes</h2>
                <CodeplexCuadricula contenedor espaciado={2}>
                    <CodeplexCuadricula elemento xs={12} md={6} lg={3}>
                        <CodeplexCampoTexto etiqueta="Estándar Delineado" fullWidth />
                    </CodeplexCuadricula>
                    <CodeplexCuadricula elemento xs={12} md={6} lg={3}>
                        <CodeplexCampoTexto etiqueta="Deshabilitado" disabled defaultValue="Bloqueado" fullWidth />
                    </CodeplexCuadricula>
                    <CodeplexCuadricula elemento xs={12} md={6} lg={3}>
                        <CodeplexCampoTexto etiqueta="Solo Lectura" defaultValue="Solo Lectura" slotProps={{ input: { readOnly: true } }} fullWidth />
                    </CodeplexCuadricula>
                    <CodeplexCuadricula elemento xs={12} md={6} lg={3}>
                        <CodeplexCampoTexto etiqueta="Estado de Error" error defaultValue="Inválido" textoAyuda="Por favor arregla esto" fullWidth />
                    </CodeplexCuadricula>
                </CodeplexCuadricula>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Multilínea</h2>
                <div className="p-6 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CodeplexCampoTexto
                        etiqueta="Biografía / Descripción"
                        multiline
                        minRows={3}
                        placeholder="Cuéntanos sobre ti..."
                        fullWidth
                    />
                </div>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Código (Lógica de Validación)
                </h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                        <code>{`const validateEmail = (value) => {
    if (!/\\S+@\\S+\\.\\S+/.test(value)) {
        setEmailError('Por favor ingrese un correo válido');
    } else {
        setEmailError('');
    }
};

<CodeplexCampoTexto
    etiqueta="Correo"
    error={!!emailError}
    textoAyuda={emailError || "Texto de ayuda"}
    onChange={(e) => validateEmail(e.target.value)}
/>`}</code>
                    </pre>
                </div>
            </section>
        </div >
    );
};
