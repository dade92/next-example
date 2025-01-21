import React, {FC, useState} from "react";
import styled from "styled-components";
import {GetServerSideProps} from "next";
import {MovieSummaryCard} from "../components/MovieSummaryCard";
import {Movie} from "../data/movies/Movie";
import {FloatingPagination} from "../components/FloatingPagination";
import {getMoviesUseCase} from "../utils/MovieUseCase";
import {Search} from "../components/Search";
import useSWR from "swr";
import {SearchMovieResponse} from "./api/search";
import {CircularProgress} from "@mui/material";

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

const fetcher = (url: string): Promise<SearchMovieResponse> =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
        return res.json();
    });


const Mflix: FC<Props> = ({movies, page, totalPages}) => {
    const [search, setSearch] = useState<string | null>("")
    const {data, isLoading} = useSWR<SearchMovieResponse>(
        search ? `api/search?query=${search}` : null,
        fetcher
    );

    const onCardClicked = () => {
        sessionStorage.setItem('lastPage', page.toString());
    };

    return (
        <Wrapper>
            <Search onSearch={(search: string) => setSearch(search)}/>
            {isLoading && <CircularProgress/>}
            {data && <MovieSummaryCard movie={data.movie} onCardClicked={onCardClicked}/>}
            {data == null && movies && movies.map((movie: Movie) => {
                return <MovieSummaryCard key={movie.id} movie={movie} onCardClicked={onCardClicked}/>
            })}
            <FloatingPagination page={page} totalPages={totalPages}
                                onPageChanged={() => setSearch(null)}/>
        </Wrapper>
    );
}

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
