import React, {FC} from "react";
import Image from "next/image";
import styled from "styled-components";
import {Card, Typography} from "@mui/material";
import { useRouter } from 'next/router';
import {Movie} from "../utils/movies/Movie";

interface Props {
    movie: Movie
}

const CardWrapper = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 16px;
    gap: 8px;
    cursor: pointer;
    max-width: 700px;
`

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    gap: 8px;
`

const PlotText = styled(Typography)`
    max-width: 500px;
`

export const MovieSummaryCard: FC<Props> = ({movie}) => {

    const handleClick = () => {
        sessionStorage.setItem('movie', JSON.stringify(movie));
        router.push(`/movieDetails/${movie.id}`);
    }

    const router = useRouter();

    return <CardWrapper onClick={handleClick}>
        <InfoWrapper>
            <Typography variant={'h5'} color={'textPrimary'} gutterBottom>{movie.title}</Typography>
            {movie.posterUrl && <Image
                src={movie.posterUrl}
                alt={movie.title + '_image'}
                width={600}
                height={400}
            />}
            <Typography>Year: {movie.year}</Typography>
            <PlotText>{movie.plot}</PlotText>
        </InfoWrapper>
    </CardWrapper>
}