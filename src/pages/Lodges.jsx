import Row from '../ui/Row';
import Heading from '../ui/Heading';
import LodgeTable from '../features/lodges/LodgeTable';
import Button from '../ui/Button';
import { useState } from 'react';
import CreateLodgeForm from '../features/lodges/CreateLodgeForm';

const Lodges = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Lodges</Heading>
        <p>Test Lodges</p>
      </Row>
      <Row>
        <LodgeTable />
        <Button
          onClick={() => {
            setShowForm((show) => !show);
          }}
        >
          Add new Lodge
        </Button>
        {showForm && <CreateLodgeForm />}
      </Row>
    </>
  );
};

export default Lodges;
