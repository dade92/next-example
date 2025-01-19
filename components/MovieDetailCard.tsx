import React, {FC} from "react";
import {Comment, Movie} from "../utils/movies/Movie";
import {CommentCard} from "./CommentCard";
import styled from "styled-components";
import {Card, CardContent, CardMedia, Divider, Typography} from "@mui/material";

interface Props {
    movie: Movie;
    comments: Comment[];
}

const Wrapper = styled(Card)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px;
`

export const MovieDetailCard: FC<Props> = ({movie, comments}) => {

    return <Wrapper sx={{maxWidth: 700}}>
        <CardMedia
            component="img"
            height="600"
            image={movie.posterUrl}
            alt=""
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {movie.title}
            </Typography>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                {movie.plot}
            </Typography>
            <Divider sx={{marginTop: '16px', marginBottom: '16px'}}/>
            <Typography variant="subtitle2" sx={{color: 'text.secondary'}}>Year: {movie.year}</Typography>
            <Typography variant="subtitle2" sx={{color: 'text.secondary'}}>Rating: {movie.rating}</Typography>
            <Typography variant="subtitle2"
                        sx={{color: 'text.secondary'}}>Directors: {movie.directors.join(", ")}</Typography>
        </CardContent>
        {/*TODO put in the expand section*/}
        {comments.length == 0 && <Typography>No comments yet</Typography>}
        {comments.map((comment: Comment) => {
            return <CommentCard comment={comment}/>
        })}
    </Wrapper>
}