import React, {FC, useState} from "react";
import styled from "styled-components";
import {GetServerSideProps} from "next";
import {MovieSummaryCard} from "../components/MovieSummaryCard";
import {Movie} from "../data/movies/Movie";
import {FloatingPagination} from "../components/FloatingPagination";
import {retrieveMoviesUseCase} from "../src/main/usecases/RetrieveMoviesUseCase";
import {Search} from "../components/Search";
import useSWR from "swr";
import {SearchMovieResponse} from "./api/search";
import {Box, LinearProgress} from "@mui/material";
import {Paragraph} from "../components/typography/Paragraph";
import {MoviesCarousel} from "../components/MoviesCarousel";
import {movieFetcher} from "../src/main/rest/MovieSearch";
import {getCookie} from "cookies-next";
import {checkAuthTokenUseCase} from "../src/main/usecases/CheckAuthTokenUseCase";
import {moviesRepository} from "../src/main/repository/Configuration";


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

const Index: FC<Props> = ({movies, page, totalPages}) => {
    const [search, setSearch] = useState<string | null>("")
    const {data: queryData, isLoading: isQueryLoading, error} = useSWR<SearchMovieResponse>(
        search ? `/api/search?query=${search}` : null,
        movieFetcher
    );

    const onCardClicked = () => {
        sessionStorage.setItem('lastPage', page.toString());
    };

    const shouldShowList =
        queryData == null &&
        error == undefined
        && !isQueryLoading;

    return (
        <Wrapper>
            <Search onSearch={(search: string) => setSearch(search)}/>
            {isQueryLoading &&
                <Box sx={{width: '100%'}}>
                    <LinearProgress/>
                </Box>
            }
            {queryData && <MovieSummaryCard movie={queryData.movie} onCardClicked={onCardClicked}/>}
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
    const {query, req, res} = context;
    const loginToken = getCookie('authToken', {req, res});

    if (!loginToken) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    } else {
        const checkResult = await checkAuthTokenUseCase(loginToken);
        if (!checkResult) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }
    }
    const page = parseInt(query.page as string) || 1;
    const {movies, pageSize, documentsCount} = await retrieveMoviesUseCase(page, moviesRepository);
    const totalPages = Math.ceil(documentsCount / pageSize);

    return {
        props: {
            movies: movies,
            page: page,
            totalPages: totalPages,
        },
    };
};

export default Index;
