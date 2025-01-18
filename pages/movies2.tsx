import React, {FC} from "react";
import {Button} from "@mui/material";
import styled from "styled-components";
import {getMovies2} from "../utils/rest/Movies";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import Image from 'next/image';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 150px;
`

export interface Movie2 {
    id: string;
    title: string;
    plot: string;
    posterUrl: string;
}

type Props = {
    data: Movie2[];
}

const Movies2: FC<Props> = ({data}) => {
    const router = useRouter();

    return (
        <Wrapper>
            <span>MOVIES</span>
            {data && data.map((movie: Movie2) => {
                return <div key={movie.id}>
                    <span>{movie.title}</span>
                    <Image
                        src={movie.posterUrl}
                        alt="Description of the image"
                        width={600}
                        height={400}
                    />
                </div>
            })}
            <Button variant="outlined" onClick={() => router.push('/')}> Back </Button>
        </Wrapper>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const movies = await getMovies2();
    return {
        props: {
            data: movies
        },
    };
};

export default Movies2;
