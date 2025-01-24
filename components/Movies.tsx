import React, {FC} from "react";
import {Movie} from "../data/movies/Movie";
import {MovieSummaryCard} from "./MovieSummaryCard";

interface Props {
    movies: Movie[];
    onCardClicked: () => void;
}

export const Movies: FC<Props> = ({movies, onCardClicked}) =>
    <>{movies.map((movie: Movie) => {
        return <MovieSummaryCard key={movie.id} movie={movie} onCardClicked={onCardClicked}/>
    })}
    </>