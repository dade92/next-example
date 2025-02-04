import * as React from "react";
import {FC, useState} from "react";
import {Comment} from "../data/movies/Movie";
import {Button, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import styled from "styled-components";

interface Props {
    comments: Comment[];
    onCommentAdded: (comment: string) => void;
}

const CommentAddWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`


export const CommentsSection: FC<Props> = ({comments, onCommentAdded}) => {
    const [comment, setComment] = useState<string>('');

    return <>
        {comments.length == 0 &&
            <Typography variant="subtitle2" sx={{color: 'text.secondary'}}>No comments yet</Typography>}
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {comments.map((comment: Comment) => {
                return <>
                    <ListItem>
                        <ListItemText
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{color: 'text.primary', display: 'inline'}}
                                    >
                                        {comment.name}
                                    </Typography>
                                    {' — '} {comment.text}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </>
            })}
        </List>
        <CommentAddWrapper>
            <TextField
                variant="outlined"
                value={comment}
                size={"small"}
                onChange={(e) => setComment(e.target.value)}
                label={'Write your comment'}>
            </TextField>
            <Button
                size={"small"}
                onClick={() => {
                    if(comment) {
                        setComment('');
                        onCommentAdded(comment)
                    }
                }}>Add</Button>
        </CommentAddWrapper>
    </>
}