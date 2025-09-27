import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar';
import type {AppProps} from 'next/app'
import styled from "styled-components";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const GeneralWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  width: 100vw;
  
  @media (max-width: 600px) {
    display: block;
    padding: 0 8px;
    width: 100%;
    min-height: auto;
  }
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
