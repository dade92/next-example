import React, {FC} from "react";
import {Movie2} from "../pages/mflix";
import Image from "next/image";
import styled from "styled-components";
import {Card, Typography} from "@mui/material";

interface Props {
    movie: Movie2
}

const CardWrapper = styled(Card)`
    margin: 16px;
    gap: 8px;
`

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    gap: 8px;
`

const PlotText = styled(Typography)`
    max-width: 300px;
`

export const Movie: FC<Props> = ({movie}) => {
    return <CardWrapper>
        <InfoWrapper>
            <Typography>{movie.title}</Typography>
            {movie.posterUrl && <Image
                src={movie.posterUrl}
                alt={movie.title + '_image'}
                width={600}
                height={400}
            />}
            <PlotText>{movie.plot}</PlotText>
        </InfoWrapper>
    </CardWrapper>
}