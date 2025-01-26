import * as React from 'react';
import {FC, useState} from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Comment, Movie} from "../data/movies/Movie";
import {styled} from '@mui/material/styles';
import {Card, CardActions, CardContent, Collapse, IconButton, IconButtonProps} from "@mui/material";
import {CommentsSection} from "./CommentsSection";
import {MovieDetailCardContent} from "./MovieDetailCardContent";
import Image from "next/image";

interface Props {
    movie: Movie;
    comments: Comment[];
}

const Wrapper = styled(Card)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px;
    align-items: center;
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

const StyledImage = styled(Image)`
    margin-bottom: 24px;
    object-fit: cover;
`

export const MovieDetailCard: FC<Props> = ({movie, comments}) => {
    const [expanded, setExpanded] = useState(false);

    return <Wrapper sx={{maxWidth: 800}}>
        <StyledImage
            width={600}
            height={400}
            layout="intrinsic"
            src={movie.posterUrl}
            alt=""
        />
        <CardContent sx={{paddingTop: '16px', paddingLeft: '16px', paddingRight: '16px'}}>
            <MovieDetailCardContent movie={movie}/>
        </CardContent>
        <CardActions disableSpacing sx={{alignSelf: 'end'}}>
            <ExpandMore
                expand={expanded}
                onClick={() => {
                    setExpanded(!expanded);
                }}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" sx={{alignSelf: 'start'}}>
            <CommentsSection comments={comments}/>
        </Collapse>
    </Wrapper>
}