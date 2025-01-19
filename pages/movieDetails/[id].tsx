import React, {FC, useEffect, useState} from "react";
import {Button} from "@mui/material";
import styled from "styled-components";
import {getMovieDetails} from "../../utils/rest/Movies";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {Movie, MovieDetail} from "../../utils/movies/Movie";
import {MovieDetailCard} from "../../components/MovieDetailCard";

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
        }
    }, []);

    const onBackClicked = () => {
        const lastPage = sessionStorage.getItem('lastPage')
        router.push(`/mflix?page=${lastPage}`)
    };

    return (
        <Wrapper>
            {movie && <MovieDetailCard movie={movie} comments={details.comments}/>}
            <Button variant="outlined" onClick={onBackClicked}> Back </Button>
        </Wrapper>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const {params} = context;
    const {id} = params;

    const details = await getMovieDetails(id);
    return {
        props: {
            details
        },
    };
};

export default MovieDetail;
