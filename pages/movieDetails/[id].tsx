import React, {FC} from "react";
import {Button, Typography} from "@mui/material";
import styled from "styled-components";
import {getMovieDetails} from "../../utils/rest/Movies";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {Comment, MovieDetail} from "../mflix";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

type Props = {
    data: MovieDetail;
}

const MovieDetail: FC<Props> = ({data}) => {
    const router = useRouter();

    return (
        <Wrapper>
            {data && data.comments.map((comment: Comment) => {
                return <div>
                    <Typography>{comment.text}</Typography>
                </div>
            })}
            <Button variant="outlined" onClick={() => router.push('/')}> Back </Button>
        </Wrapper>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { params } = context;
    const { id } = params;

    const details = await getMovieDetails(id);
    return {
        props: {
            data: details
        },
    };
};

export default MovieDetail;
