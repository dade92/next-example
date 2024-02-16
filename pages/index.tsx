import {GetServerSideProps} from 'next';
import {FC} from "react";

type Data = {
    name: string;
    age: number;
}

type Props = {
    data: Data[];
}

const DataDisplay: FC<Props> = ({data}) => {
    return (
        <>
            {
                data.map(d => {
                    return <div key={d.name}>
                        <span>{d.age}</span>
                        <span>{d.name}</span>
                    </div>
                })
            }
        </>
    )
}

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
