import React, {FC} from "react";
import {Comment, Movie} from "../utils/movies/Movie";
import {CommentCard} from "./CommentCard";
import styled from "styled-components";
import {Typography} from "@mui/material";

interface Props {
    movie: Movie;
    comments: Comment[];
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const MovieDetailCard: FC<Props> = ({movie, comments}) => {
    return <Wrapper>
        <Typography>{movie.title}</Typography>
        <Typography>{movie.year}</Typography>
        <Typography>{movie.plot}</Typography>
        <Typography>{movie.rating}</Typography>
        {comments.length == 0 && <Typography>No comments yet</Typography>}
        {comments.map((comment: Comment) => {
            return <CommentCard comment={comment}/>
        })}
    </Wrapper>
}