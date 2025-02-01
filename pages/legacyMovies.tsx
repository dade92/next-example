import React, {FC} from "react";
import {Button, CircularProgress} from "@mui/material";
import styled from "styled-components";
import useSWR from "swr";
import {Book} from "./books";
import {getLegacyMovies} from "../src/main/rest/Movies";
import {useRouter} from "next/router";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 150px;
`

export interface LegacyMovie {
    id: string;
    title: string;
}

const LegacyMovies: FC = () => {
    const router = useRouter();
    const {data, error, isLoading} = useSWR('movies', getLegacyMovies);

    return (
        <Wrapper>
            <span>MOVIES</span>
            {isLoading && <CircularProgress/>}
            {data && data.map((b: Book) => {
                return <div key={b.id}>
                    <span>{b.title}</span>
                </div>
            })}
            {error && <span>BOOOM!! SOMETHING WENT WRONG</span>}
            <Button variant="outlined" onClick={() => router.push('/')}> Back </Button>
        </Wrapper>
    );
}

export default LegacyMovies;
