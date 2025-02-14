import {useEffect, useState} from "react";
import {Alert, Box, Button, CircularProgress, Container, TextField, Typography} from "@mui/material";
import Link from "next/link";
import Cookies from 'js-cookie';
import {useRouter} from "next/router";
import {getCookie} from "cookies-next";
import {myFetch} from "../../src/main/rest/MyFetch";

const Login = () => {
    const router = useRouter();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const authToken = getCookie('authToken');
        if (authToken) {
            router.push('/mflix');
        }
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await myFetch("/api/login", "POST", {username, password});

            if (!response.ok) {
                setError("Login failed. Check your credentials!");
            } else {
                const data = await response.json();
                Cookies.set('authToken', data.token, {expires: new Date(data.expirationDate)});
                router.push('/mflix');
            }
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