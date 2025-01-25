import * as React from "react";
import {FC} from "react";
import {Divider, Typography} from "@mui/material";
import {Movie} from "../data/movies/Movie";
import styled from "styled-components";
import {Paragraph} from "./typography/Paragraph";
import {CardTitle} from "./typography/CardTitle";
import Link from "next/link";

interface Props {
    movie: Movie
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const StyledLink = styled(Link)`
    color: grey;
    text-decoration: underline;
    font-family: 'Roboto', sans-serif;
`;

const Subtitle: FC<{ text: string }> = ({text}) =>
    <Typography variant="subtitle2" sx={{color: 'text.secondary'}}>{text}</Typography>

export const MovieDetailCardContent: FC<Props> = ({movie}) =>
    <Wrapper>
        <CardTitle title={movie.title}/>
        <Paragraph text={movie.fullPlot}/>
        <Divider sx={{marginTop: '16px', marginBottom: '16px'}}/>
        <Subtitle text={`Year: ${movie.year}`}/>
        <Subtitle text={`Rating: ${movie.rating}`}/>
        <Subtitle text={`Directors: ${movie.directors.join(", ")}`}/>
        <Subtitle text={`Genres: ${movie.genres.join(", ")}`}/>
        <Subtitle text={`Release date: ${movie.releaseDate}`}/>
        <StyledLink
            href={movie.googleLink}
            target="_blank"
            rel={"noreferrer"}
        >
            {'Google link'}
        </StyledLink>
    </Wrapper>