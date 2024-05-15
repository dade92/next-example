import React, {FC} from "react";
import StyledSpan from "../components/Texts";
import {GetServerSideProps} from "next";
import {retrieveData} from "../db/db";


type Events = {
    name: string;
    age: number;
}

type Props = {
    data: Events[];
}


const DataDisplay: FC<Props> = ({data}) =>
    (
        <>
            {
                data.map(d => {
                    return <div key={d.name}>
                        <StyledSpan>{d.age}</StyledSpan>
                        <StyledSpan>{d.name}</StyledSpan>
                    </div>
                })
            }
        </>
    )

export default DataDisplay;

export const getServerSideProps: GetServerSideProps = async () => {
    await retrieveData();

    return {
        props: {
            data: [
                {
                    age: 10,
                    name: "ciccio"
                },
                {
                    age: 12,
                    name: "pasticcio"
                }
            ],
        },
    };
};
