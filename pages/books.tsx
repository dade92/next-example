import React, {FC, useState} from "react";
import {GetServerSideProps} from "next";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {frontendRestClient} from "../utils/rest/RestClient";
import {Data} from "./api/hello";
import styled from "styled-components";
import {getBooks} from "../utils/rest/Book";

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
    gap: 16px;
    width: 50%;
`


const DataDisplay: FC<Props> = ({data}) => {
    const [restData, setRestData] = useState<Data | undefined>(undefined)
    const getHello = () => {
        console.log('GET hello called!')
        frontendRestClient.get<Data>('/hello').then((d: Data) => {
            setRestData(d)
        })
    }

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
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {b.title}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={getHello}>API call</Button>
            {restData && <span>{restData.name}</span>}
        </Wrapper>
    );
}

export default DataDisplay;

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await getBooks();
    return {
        props: {
            data: data
        },
    };
};
