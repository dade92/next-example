import * as React from "react";
import {FC} from "react";

interface Props {
    trailerUrl: string;
}

export const MovieTrailer: FC<Props> = ({trailerUrl}) => {
    return <>
        <iframe
            width="560"
            height="315"
            src={trailerUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    </>
}