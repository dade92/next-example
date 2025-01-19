import * as React from "react";
import {FC} from "react";
import {Comment} from "../utils/movies/Movie";
import {List, ListItem, ListItemText, Typography} from "@mui/material";

interface Props {
    comments: Comment[];
}

export const CommentsSection: FC<Props> = ({comments}) => {
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
    </>
}