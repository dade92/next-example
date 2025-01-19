import {FC} from "react";
import {Comment} from "../utils/movies/Movie";
import {Typography} from "@mui/material";
import styled from "styled-components";
import * as React from "react";

interface Props {
    comment: Comment
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    max-width: 400px;
`

export const CommentCard: FC<Props> = ({comment}) => {
    return <Wrapper>
        <Typography variant="subtitle1" sx={{color: 'text.secondary'}}>{comment.text}</Typography>
        <Typography variant="subtitle2" sx={{color: 'text.secondary'}}>{comment.email}</Typography>
    </Wrapper>
}