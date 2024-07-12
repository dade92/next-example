import React, {FC} from "react";
import Link from "next/link";
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
    width: 50%;
`

const StyledLink = styled(Link)`
    align-self: center;
`

const Index: FC<Props> = ({data}) => (
        <Wrapper>
            <StyledLink
                href={{
                    pathname: '/books',
                }}
                rel="noreferrer"
            >
                Books
            </StyledLink>
            <StyledLink
                href={{
                    pathname: '/movies',
                }}
                rel="noreferrer"
            >
                Movies
            </StyledLink>
            <StyledLink
                href={{
                    pathname: '/documents',
                }}
                rel="noreferrer"
            >
                Upload
            </StyledLink>
            <StyledLink
                href={{
                    pathname: '/events',
                }}
                rel="noreferrer"
            >
                Events
            </StyledLink>
        </Wrapper>
    )

export default Index;