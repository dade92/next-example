import {useState} from "react";
import {Alert, Box, Button, CircularProgress, Container, TextField, Typography} from "@mui/material";
import Link from "next/link";
import Cookies from 'js-cookie';
import {useRouter} from "next/router";

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            //TODO properly stor the auth token and give correct feedback to the customer
            const data = await response.json();
            Cookies.set('authToken', data.token, {expires: 1});
            router.push('/mflix')
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                    fullWidth
                    margin="normal"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{mt: 2}}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24}/> : "Login"}
                </Button>
                <Typography variant="body2" sx={{mt: 2}}>Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default Login;