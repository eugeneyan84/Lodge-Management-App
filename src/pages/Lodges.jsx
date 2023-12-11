import Row from '../ui/Row';
import Heading from '../ui/Heading';
import LodgeTable from '../features/lodges/LodgeTable';

const Lodges = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Lodges</Heading>
        <p>Test Lodges</p>
      </Row>
      <Row>
        <LodgeTable />
      </Row>
    </>
  );
};

export default Lodges;
