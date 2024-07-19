import React, {FC} from "react";
import Link from "next/link";
import styled from "styled-components";
import {RepoInformation} from "../utils/repository/Data";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 50%;
`

const StyledLink = styled(Link)`
    align-self: center;
`

const Index: FC<RepoInformation> = ({name, stargazers_count, owner}: RepoInformation) => {
    console.log("repo name: " + name)
    console.log("repo stars: " + stargazers_count)
    console.log("owner: " + owner.login)

    return (
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
    );
}

export const getStaticProps = async () => {
    const repo = await fetch('https://api.github.com/repos/dade92/next-example');
    const info: RepoInformation = await repo.json();
    return {props: info};
};

export default Index;