import React, {FC} from "react";
import {Button} from "@mui/material";
import styled from "styled-components";
import {getMovies} from "../utils/rest/Movies";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {MovieSummaryCard} from "../components/MovieSummaryCard";
import {Movie} from "../utils/movies/Movie";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

type Props = {
    data: Movie[];
}

const Mflix: FC<Props> = ({data}) => {
    const router = useRouter();

    return (
        <Wrapper>
            {data && data.map((movie: Movie) => {
                return <div key={movie.id}>
                    <MovieSummaryCard movie={movie}/>
                </div>
            })}
            <Button variant="outlined" onClick={() => router.push('/')}> Back </Button>
        </Wrapper>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const movies = await getMovies();
    return {
        props: {
            data: movies
        },
    };
};

export default Mflix;
