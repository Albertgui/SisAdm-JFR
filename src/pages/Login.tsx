import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, TextField, Stack, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, FormHelperText, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginApp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorLogin, setErrorLogin] = useState("")

    const isUserValid = username.length >= 3 && username.length <= 20;
    const isPassValid = password.length >= 3 && password.length <= 20;
    const formIsValid = isUserValid && isPassValid;
    const showUserError = username.length > 0 && !isUserValid;
    const showPassError = password.length > 0 && !isPassValid;

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        const logAccess = {
            usuario: "admin",
            password: "jfr123456"
        };
        const dataIn = {
            usuario: username.toLowerCase(),
            password: password
        };
        if (dataIn.usuario == logAccess.usuario && dataIn.password == dataIn.password){
            console.log(true)
        } else {
            setErrorLogin("Credenciales incorrectas")
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card sx={{ minWidth: 600, boxShadow: "0 10px 30px 0 rgba(0,0,0,0.4)" }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
                        <img src="/logoJf.jpeg" alt="Logo" />
                    </Box>
                    <Typography variant="h5" component="div" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                        Sistema de administración José Félix Ribas Zona 2
                    </Typography>
                    <Stack spacing={3} sx={{ mt: 4, mb: 4 }}>
                        <TextField
                            label="Usuario"
                            variant="outlined"
                            fullWidth
                            value={username || ""}
                            onChange={(e) => setUsername(e.target.value)}
                            error={showUserError}
                            helperText={showUserError ? "Debe tener entre 3 y 20 caracteres" : ""}
                        />
                        <FormControl variant="outlined" fullWidth error={showPassError}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            {showPassError && (
                                <FormHelperText>Debe tener entre 3 y 20 caracteres</FormHelperText>
                            )}
                        </FormControl>
                        {errorLogin && (
                            <Typography sx={{ textAlign: 'center', color: '#dd0808ff' }}>{errorLogin}</Typography>
                        )}
                    </Stack>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3 }}>
                        <Button
                            variant="contained"
                            onClick={handleLogin}
                            disabled={!formIsValid}
                            size="large"
                            fullWidth
                            color="error"
                        >
                            Ingresar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}