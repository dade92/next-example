import React, {FC} from "react";
import styled from "styled-components";
import {GetServerSideProps} from "next";
import {MovieSummaryCard} from "../components/MovieSummaryCard";
import {Movie} from "../data/movies/Movie";
import {FloatingPagination} from "../components/FloatingPagination";
import {getMoviesUseCase} from "../utils/MovieUseCase";
import {Search} from "../components/Search";

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

const Mflix: FC<Props> = ({movies, page, totalPages}) =>
    (
        <Wrapper>
            <Search />
            {movies && movies.map((movie: Movie) => {
                return <MovieSummaryCard key={movie.id} movie={movie} onCardClicked={() => {
                    sessionStorage.setItem('lastPage', page.toString());
                }}/>
            })}
            <FloatingPagination page={page} totalPages={totalPages}/>
        </Wrapper>
    )

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {query} = context;
    const page = parseInt(query.page as string) || 1;
    const {movies, pageSize} = await getMoviesUseCase(page);
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
