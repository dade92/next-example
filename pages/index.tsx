import {GetServerSideProps} from 'next';
import React, {FC} from "react";
import StyledSpan from "../components/Texts";

type Data = {
    name: string;
    age: number;
}

type Props = {
    data: Data[];
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
    console.log('Retrieving props on server side...')
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
