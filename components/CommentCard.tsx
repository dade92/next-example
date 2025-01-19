import {FC} from "react";
import {Comment} from "../utils/movies/Movie";
import {Typography} from "@mui/material";
import styled from "styled-components";

interface Props {
    comment: Comment
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 16px;
    max-width: 400px;
`

export const CommentCard: FC<Props> = ({comment}) => {
    return <Wrapper>
        <Typography>{comment.text}</Typography>
        <Typography>{comment.email}</Typography>
    </Wrapper>
}