import * as React from "react";
import {FC} from "react";
import {Divider, Typography} from "@mui/material";
import {Movie} from "../data/movies/Movie";
import styled from "styled-components";

interface Props {
    movie: Movie
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const MovieDetailCardContent: FC<Props> = ({movie}) =>
    <Wrapper>
        <Typography gutterBottom variant="h5" component="div">
            {movie.title}
        </Typography>
        <Typography variant="body2" sx={{color: 'text.secondary'}}>
            {movie.fullPlot}
        </Typography>
        <Divider sx={{marginTop: '16px', marginBottom: '16px'}}/>
        <Typography variant="subtitle2" sx={{color: 'text.secondary'}}>Year: {movie.year}</Typography>
        <Typography variant="subtitle2" sx={{color: 'text.secondary'}}>Rating: {movie.rating}</Typography>
        <Typography variant="subtitle2"
                    sx={{color: 'text.secondary'}}>Directors: {movie.directors.join(", ")}</Typography>
        <Typography variant="subtitle2"
                    sx={{color: 'text.secondary'}}>Genres: {movie.genres.join(", ")}</Typography>
    </Wrapper>