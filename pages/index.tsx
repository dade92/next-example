import React, {FC} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {Button} from "@mui/material";
import styled from "styled-components";

type Data = {
    name: string;
    age: number;
}

type Props = {
    data: Data[];
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const StyledButton = styled(Button)`
    width: 50%;
`


const Index: FC<Props> = ({data}) => {
    const router = useRouter()

    return (
        <Wrapper>
            <span>INDEX</span>
            <Link
                href={{
                    pathname: '/books',
                    query: {
                        message: 'from index with love'
                    },
                }}
                rel="noreferrer"
            >
                Books
            </Link>
            <StyledButton onClick={() => router.push('/events')}>Events</StyledButton>
        </Wrapper>
    );
}

export default Index;