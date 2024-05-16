import React, {FC, useState} from "react";
import {GetServerSideProps} from "next";
import {Button} from "@mui/material";
import {staticRestClient} from "../utils/rest/RestClient";
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
`


const DataDisplay: FC<Props> = ({data}) => {
    const [restData, setRestData] = useState<Data | undefined>(undefined)
    const getHello = () => {
        console.log('GET hello called!')
        staticRestClient.get<Data>('/hello').then((d: Data) => {
            setRestData(d)
        })
    }

    return (
        <Wrapper>
            <span>EVENTS</span>
            <>
                {data.map((b: Book) => {
                    return <div key={b.id}>
                        <span>{b.title}</span>
                    </div>
                })}
            </>
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
