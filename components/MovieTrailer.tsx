import * as React from "react";
import {FC} from "react";
import styled from "styled-components";

interface Props {
    trailerUrl: string;
}

const Wrapper = styled.div`
    margin-top: 24px;
`

export const MovieTrailer: FC<Props> = ({trailerUrl}) =>
    <Wrapper>
        <iframe
            width="560"
            height="315"
            src={trailerUrl}
            title="trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    </Wrapper>