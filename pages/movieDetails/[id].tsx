import React, {FC, useEffect, useState} from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {Movie, MovieDetail} from "../../data/movies/Movie";
import {MovieDetailCard} from "../../components/MovieDetailCard";
import {FloatingBackButton} from "../../components/FloatingBackButton";
import {retrieveMovieDetailsUseCase} from "../../src/main/usecases/RetrieveMovieDetailUseCase";
import {movieDetailFetcher} from "../../src/main/rest/MovieDetailFetcher";
import {SearchMovieResponse} from "../api/search";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

type Props = {
    details: MovieDetail;
}

const MovieDetail: FC<Props> = ({details}) => {
    const router = useRouter();
    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {
        const storedData = sessionStorage.getItem('movie');
        if (storedData) {
            setMovie(JSON.parse(storedData));
        } else {
            const {id} = router.query;
            movieDetailFetcher(
                id as string,
                (movieResponse: SearchMovieResponse) => setMovie(movieResponse.movie)
            );
        }
    }, []);

    const onBackClicked = () => {
        const lastPage = sessionStorage.getItem('lastPage');
        router.push(`/mflix?page=${lastPage}`);
    };

    return (
        <Wrapper>
            {movie && <MovieDetailCard movie={movie} initialComments={details.comments}/>}
            <FloatingBackButton onBackClicked={onBackClicked}/>
        </Wrapper>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const {params} = context;
    const {id} = params;

    const details = await retrieveMovieDetailsUseCase(id);
    return {
        props: {
            details
        },
    };
};

export default MovieDetail;
