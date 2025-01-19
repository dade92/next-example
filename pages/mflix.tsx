import React, {FC} from "react";
import {Button} from "@mui/material";
import styled from "styled-components";
import {getMovies} from "../utils/rest/Movies";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {MovieSummaryCard} from "../components/MovieSummaryCard";
import {Movie} from "../utils/movies/Movie";
import {FloatingPagination} from "../components/FloatingPagination";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

interface Props {
    movies: Movie[];
    page: number;
    totalPages: number;
}

const Mflix: FC<Props> = ({movies, page, totalPages}) => {
    const router = useRouter();

    return (
        <Wrapper>
            {movies && movies.map((movie: Movie) => {
                return <MovieSummaryCard movie={movie} onCardClicked={() => {
                    sessionStorage.setItem('lastPage', page.toString());
                }}/>
            })}
            <FloatingPagination page={page} totalPages={totalPages}/>
            <Button variant="outlined" onClick={() => router.push('/')}> Back </Button>
        </Wrapper>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {query} = context;
    const page = parseInt(query.page as string) || 1;
    const {movies, pageSize} = await getMovies(page);
    //TODO still needed the total number of pages
    const totalPages = Math.ceil(1000 / pageSize);

    return {
        props: {
            movies: movies,
            page: page,
            totalPages: totalPages,
        },
    };
};

export default Mflix;
