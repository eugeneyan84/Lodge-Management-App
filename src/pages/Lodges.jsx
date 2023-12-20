import Row from '../ui/Row';
import Heading from '../ui/Heading';
import LodgeTable from '../features/lodges/LodgeTable';
import AddLodge from '../features/lodges/AddLodge';
import LodgeTableOps from '../features/lodges/LodgeTableOps';

const Lodges = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Lodges</Heading>
        <LodgeTableOps />
      </Row>
      <Row>
        <LodgeTable />
        <AddLodge />
      </Row>
    </>
  );
};

export default Lodges;
