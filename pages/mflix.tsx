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

type Props = {
    data: Movie[];
    page: number;
    totalPages: number;
}

const Mflix: FC<Props> = ({data, page, totalPages}) => {
    const router = useRouter();

    return (
        <Wrapper>
            {data && data.map((movie: Movie) => {
                return <div key={movie.id}>
                    <MovieSummaryCard movie={movie}/>
                </div>
            })}
            <FloatingPagination page={page} totalPages={totalPages}/>
            <Button variant="outlined" onClick={() => router.push('/')}> Back </Button>
        </Wrapper>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const movies = await getMovies();
    const { query } = context;
    const page = parseInt(query.page) || 1;
    const pageSize = 10;
    const totalPages = Math.ceil(1000 / pageSize);

    return {
        props: {
            data: movies,
            page: page,
            totalPages: totalPages,
        },
    };
};

export default Mflix;
