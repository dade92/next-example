import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar';
import type {AppProps} from 'next/app'
import styled from "styled-components";

const GeneralWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
`

export default function App({Component, pageProps}: AppProps) {
    return <GeneralWrapper>
        <NextNProgress/><Component {...pageProps} />
    </GeneralWrapper>
}
