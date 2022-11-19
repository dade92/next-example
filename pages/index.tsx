
import { GetServerSideProps } from 'next';

type Data = {
  name: string;
  age: number;
}

type Props = {
  data: string;
}

const DataDisplay: React.FC<Props> = ({ data }) => {
  return (
    <span>{data}</span>
  )
}

export default DataDisplay;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      data: "Here you can load dynamic content",
    },
  };
};
