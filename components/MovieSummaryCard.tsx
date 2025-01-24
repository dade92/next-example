import React, {FC} from "react";
import Image from "next/image";
import styled from "styled-components";
import {Box, Card} from "@mui/material";
import {useRouter} from 'next/router';
import {Movie} from "../data/movies/Movie";
import {Paragraph} from "./typography/Paragraph";
import {CardTitle} from "./typography/CardTitle";

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
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
            },
        }}
    >
        <StyledCard onClick={handleClick}>
            <CardTitle title={movie.title}/>
            {movie.posterUrl && <StyledImage
                src={movie.posterUrl}
                alt={movie.title + '_image'}
                width={600}
                height={400}
            />}
            <Paragraph text={`Year: ${movie.year}`}/>
            <Paragraph text={movie.plot}/>
        </StyledCard>
    </Box>
}