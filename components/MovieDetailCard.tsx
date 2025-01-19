import * as React from 'react';
import {FC} from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Comment, Movie} from "../utils/movies/Movie";
import {CommentCard} from "./CommentCard";
import {styled} from '@mui/material/styles';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    Divider,
    IconButton,
    IconButtonProps,
    Typography
} from "@mui/material";

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
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return <Wrapper sx={{maxWidth: 800}}>
        <CardMedia
            component="img"
            height="600"
            image={movie.posterUrl}
            alt=""
        />
        <CardContent sx={{paddingTop: '16px', paddingLeft: '16px', paddingRight: '16px'}}>
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
            <Typography variant="subtitle2"
                        sx={{color: 'text.secondary'}}>Genres: {movie.genres.join(", ")}</Typography>
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
            {comments.length == 0 &&
                <Typography variant="subtitle2" sx={{color: 'text.secondary'}}>No comments yet</Typography>}
            {comments.map((comment: Comment) => {
                return <CommentCard comment={comment}/>
            })}
        </Collapse>
    </Wrapper>
}