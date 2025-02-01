import React, {FC} from "react";
import {GetServerSideProps} from "next";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import styled from "styled-components";
import {getBooks} from "../src/main/rest/Book";
import {useRouter} from "next/router";

export interface Book {
    id: string;
    title: string;
}

type Props = {
    data: Book[];
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 200px;
    width: 40%;
    gap: 16px;
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`

const Books: FC<Props> = ({data}) => {
    const router = useRouter();

    return (
        <Wrapper>
            <span>BOOKS</span>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Book Title</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((b: Book) => (
                            <TableRow
                                key={b.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {b.title}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ButtonWrapper>
                <Button variant="outlined" onClick={() => router.push('/')}> Back </Button>
            </ButtonWrapper>
        </Wrapper>
    );
}

export default Books;

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await getBooks();
    return {
        props: {
            data: data
        },
    };
};
