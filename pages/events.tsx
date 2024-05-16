import React, {FC, useState} from "react";
import {GetServerSideProps} from "next";
import {getEvents, MyEvent} from "../utils/db/eventsProvider";
import {Button} from "@mui/material";
import {frontendRestClient} from "../utils/rest/RestClient";
import {Data} from "./api/hello";
import styled from "styled-components";

type Props = {
    data: MyEvent[];
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
        frontendRestClient.get<Data>('/hello').then((d: Data) => {
            setRestData(d)
        })
    }

    return (
        <Wrapper>
            <span>EVENTS</span>
            <>
                {data.map(d => {
                    return <div key={d.id}>
                        <span>{d.message}</span>
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
    const data = await getEvents();
    return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
        },
    };
};
