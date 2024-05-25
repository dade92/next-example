import React, {FC} from "react";
import {CircularProgress} from "@mui/material";
import styled from "styled-components";
import useSWR from "swr";
import {getBooks} from "../utils/rest/Book";
import {Book} from "./books";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const DataDisplay: FC = () => {
    const {data, error, isLoading} = useSWR('books', getBooks)

    return (
        <Wrapper>
            <span>BOOKS CLIENT SIDE</span>
            {isLoading && <CircularProgress/>}
            {data && data.map((b: Book) => {
                return <div key={b.id}>
                    <span>{b.title}</span>
                </div>
            })}
            {error && <span>BOOOM!! SOMETHING WENT WRONG</span>}
        </Wrapper>
    );
}

export default DataDisplay;
