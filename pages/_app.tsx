import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar';
import type {AppProps} from 'next/app'
import styled from "styled-components";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const GeneralWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
`

const theme = createTheme({
    transitions: {
        duration: {
            shortest: 150,
            shorter: 200,
            standard: 300,
        },
    },
});

export default function App({Component, pageProps}: AppProps) {
    return <GeneralWrapper>
        <ThemeProvider theme={theme}>
            <NextNProgress/><Component {...pageProps} />
        </ThemeProvider>
    </GeneralWrapper>
}
