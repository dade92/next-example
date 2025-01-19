import React, {FC} from "react";
import {Comment, Movie} from "../utils/movies/Movie";
import {MovieSummaryCard} from "./MovieSummaryCard";
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
        {movie && <MovieSummaryCard movie={movie}/>}
        {comments.length == 0 && <Typography>No comments yet</Typography>}
        {comments.map((comment: Comment) => {
            return <CommentCard comment={comment}/>
        })}
    </Wrapper>
}