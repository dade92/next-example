import React, {FC, useState} from "react";
import {GetServerSideProps} from "next";
import {getEvents, MyEvent} from "../utils/db/eventsProvider";
import {Button} from "@mui/material";
import {staticRestClient} from "../utils/rest/RestClient";
import {Data} from "./api/hello";

type Props = {
    data: MyEvent[];
}


const DataDisplay: FC<Props> = ({data}) => {
    const [restData, setRestData] = useState<Data | undefined>(undefined)
    const getHello = () => {
        console.log('GET hello called!')
        staticRestClient.get<Data>('/hello').then((d: Data) => {
            setRestData(d)
        })
    }

    return (
        <>
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
        </>
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
