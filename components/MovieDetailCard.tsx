import * as React from 'react';
import {FC, useState} from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Comment, Movie} from "../data/movies/Movie";
import {styled} from '@mui/material/styles';
import {Card, CardActions, CardContent, CardMedia, Collapse, IconButton, IconButtonProps} from "@mui/material";
import {CommentsSection} from "./CommentsSection";
import {MovieDetailCardContent} from "./MovieDetailCardContent";

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

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled(({expand, ...other}: ExpandMoreProps) => (
    <IconButton {...other} />
))(({theme, expand}: { theme: any; expand: boolean }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)', // Conditionally apply rotation
}));

export const MovieDetailCard: FC<Props> = ({movie, comments}) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return <Wrapper sx={{maxWidth: 800}}>
        <CardMedia
            component="img"
            image={movie.posterUrl}
            alt=""
        />
        <CardContent sx={{paddingTop: '16px', paddingLeft: '16px', paddingRight: '16px'}}>
            <MovieDetailCardContent movie={movie}/>
        </CardContent>
        <CardActions disableSpacing>
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon/>
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CommentsSection comments={comments}/>
        </Collapse>
    </Wrapper>
}