import {GetServerSideProps} from 'next';
import {FC} from "react";

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
                        <span>{d.age}</span>
                        <span>{d.name}</span>
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
                    age: 30,
                    name: "Davide"
                },
                {
                    age: 32,
                    name: "Lorenzo"
                }
            ],
        },
    };
};
