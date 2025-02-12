import React from "react";
import {Button, Typography} from "@mui/material";
import {useRouter} from "next/router";
import styled from "styled-components";

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
`;

export const SuccessSignUp = () => {
    const router = useRouter();

    const handleLoginRedirect = () => {
        router.push("/login");
    };

    return (
        <CenteredContainer>
            <Typography variant="h4" gutterBottom>Sign Up Successful!!</Typography>
            <Typography>Your account has been created successfully</Typography>
            <Button variant="contained" color="primary" onClick={handleLoginRedirect} sx={{mt: 2}}>
                Go to Login
            </Button>
        </CenteredContainer>
    );
}

export default SuccessSignUp;