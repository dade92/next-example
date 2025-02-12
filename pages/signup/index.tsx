import {useState} from "react";
import {Alert, Box, Button, CircularProgress, Container, Link, TextField, Typography} from "@mui/material";
import {useRouter} from "next/router";

const SignupForm = () => {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSignup = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, email, password}),
            });

            if (!response.ok) {
                throw new Error("Signup failed");
            }
            //TODO proper signup feedback needed here, maybe with a landing page and redirect to login
            router.push(`/login`);
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
                    Sign Up
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
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onClick={handleSignup}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24}/> : "Sign Up"}
                </Button>
                <Typography variant="body2" sx={{mt: 2}}>
                    Already have an account? <Link href="/login">Login</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default SignupForm;