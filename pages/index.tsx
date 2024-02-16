import {GetServerSideProps} from 'next';
import {FC} from "react";
import styled from 'styled-components';

type Data = {
    name: string;
    age: number;
}

type Props = {
    data: Data[];
}

const StyledSpan = styled.span`
    color: red;
`


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
