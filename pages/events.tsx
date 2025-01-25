import React, {FC} from "react";
import {GetServerSideProps} from "next";
import {getEvents, MyEvent} from "../utils/db/eventsProvider";
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
        </Wrapper>
    );
}

export default DataDisplay;

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await getEvents();
    return {
        props: {
            data: data
        },
    };
};
