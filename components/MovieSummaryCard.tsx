import React, {FC} from "react";
import Image from "next/image";
import styled from "styled-components";
import {Box, Card, Typography} from "@mui/material";
import {useRouter} from 'next/router';
import {Movie} from "../utils/movies/Movie";

interface Props {
    movie: Movie
    onCardClicked: () => void;
}

const StyledCard = styled(Card)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;
    max-width: 700px;
    padding: 32px;
`

const StyledImage = styled(Image)`
    width: 100%;
    margin-bottom: 24px;
`

const PlotText = styled(Typography)`
    max-width: 500px;
`

export const MovieSummaryCard: FC<Props> = ({movie, onCardClicked}) => {
    const router = useRouter();

    const handleClick = () => {
        sessionStorage.setItem('movie', JSON.stringify(movie));
        onCardClicked();
        router.push(`/movieDetails/${movie.id}`);
    }

    return <Box
        sx={{
            display: 'inline-block',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth animation
            '&:hover': {
                transform: 'scale(1.05)', // Slight zoom effect
                boxShadow: 6, // Elevate the card on hover
            },
        }}
    >
        <StyledCard onClick={handleClick}>
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
    </Box>
}