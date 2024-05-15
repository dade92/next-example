import React, {FC} from "react";
import {GetServerSideProps} from "next";
import {getEvents, MyEvent} from "../db/eventsProvider";

type Props = {
    data: MyEvent[];
}


const DataDisplay: FC<Props> = ({data}) =>
    (
        <>
            <span>EVENTS</span>
            <>
                {data.map(d => {
                    return <div key={d.id}>
                        <span>{d.message}</span>
                    </div>
                })}
            </>
        </>
    )

export default DataDisplay;

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await getEvents();
    return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
        },
    };
};
