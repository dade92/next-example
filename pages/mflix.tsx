import React, {FC, useState} from "react";
import styled from "styled-components";
import {GetServerSideProps} from "next";
import {MovieSummaryCard} from "../components/MovieSummaryCard";
import {Movie} from "../data/movies/Movie";
import {FloatingPagination} from "../components/FloatingPagination";
import {getMoviesUseCase} from "../src/MovieUseCase";
import {Search} from "../components/Search";
import useSWR from "swr";
import {SearchMovieResponse} from "./api/search";
import {Box, LinearProgress} from "@mui/material";
import {Paragraph} from "../components/typography/Paragraph";
import {MoviesCarousel} from "../components/MoviesCarousel";
import {moviesFetcher} from "../src/rest/MovieListFetcher";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 500px;
`

interface Props {
    movies: Movie[];
    page: number;
    totalPages: number;
}

const Mflix: FC<Props> = ({movies, page, totalPages}) => {
    const [search, setSearch] = useState<string | null>("")
    const {data, isLoading, error} = useSWR<SearchMovieResponse>(
        search ? `api/search?query=${search}` : null,
        moviesFetcher
    );

    const onCardClicked = () => {
        sessionStorage.setItem('lastPage', page.toString());
    };

    const shouldShowList =
        data == null &&
        error == undefined
        && !isLoading;

    return (
        <Wrapper>
            <Search onSearch={(search: string) => setSearch(search)}/>
            {isLoading &&
                <Box sx={{width: '100%'}}>
                    <LinearProgress/>
                </Box>
            }
            {data && <MovieSummaryCard movie={data.movie} onCardClicked={onCardClicked}/>}
            {error?.status == 404 && <Paragraph text={'No results found'}/>}
            {error?.status == 500 && <Paragraph text={'Ops.. Unexpected error!'}/>}
            {shouldShowList && <MoviesCarousel movies={movies} onCardClicked={onCardClicked}/>}
            <FloatingPagination
                page={page}
                totalPages={totalPages}
                onPageChanged={() => setSearch(null)}
            />
        </Wrapper>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {query} = context;
    const page = parseInt(query.page as string) || 1;
    const {movies, pageSize, documentsCount} = await getMoviesUseCase(page);
    const totalPages = Math.ceil(documentsCount / pageSize);

    return {
        props: {
            movies: movies,
            page: page,
            totalPages: totalPages,
        },
    };
};

export default Mflix;
