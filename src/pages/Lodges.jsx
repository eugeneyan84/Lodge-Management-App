import Row from '../ui/Row';
import Heading from '../ui/Heading';
import { useEffect } from 'react';
import { getLodges } from '../services/apiLodges';

const Lodges = () => {
  useEffect(() => {
    getLodges().then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All Lodges</Heading>
      <p>Test Lodges</p>
      <img src="https://qeonbuukmudyccasecjs.supabase.co/storage/v1/object/public/lodge-images/lodge-001.jpg" />
    </Row>
  );
};

export default Lodges;
