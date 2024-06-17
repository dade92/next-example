import '../styles/globals.css'
import type { AppProps } from 'next/app'
import styled from "styled-components";

const GeneralWrapper = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function App({ Component, pageProps }: AppProps) {
  return <GeneralWrapper><Component {...pageProps} /></GeneralWrapper>
}
