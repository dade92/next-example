import React, {FC} from "react";
import Image from "next/image";
import styled from "styled-components";
import {Card, Divider, Typography} from "@mui/material";
import {useRouter} from 'next/router';
import {Movie} from "../utils/movies/Movie";

interface Props {
    movie: Movie
}

const StyledCard = styled(Card)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;
    max-width: 700px;
    padding: 32px 0 32px 32px;
`

const StyledImage = styled(Image)`
    margin-bottom: 24px;
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

    return <StyledCard onClick={handleClick}>
        <Typography variant={'h5'} color={'textPrimary'} gutterBottom>{movie.title}</Typography>
        {movie.posterUrl && <StyledImage
            src={movie.posterUrl}
            alt={movie.title + '_image'}
            width={600}
            height={400}
        />}
        <Typography>Year: {movie.year}</Typography>
        <PlotText>{movie.plot}</PlotText>
    </StyledCard>
}