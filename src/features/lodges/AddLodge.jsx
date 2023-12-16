import { useState } from 'react';

import Button from '../../ui/Button';
import CreateLodgeForm from './CreateLodgeForm';

const AddLodge = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setShowForm((show) => !show);
        }}
      >
        Add new Lodge
      </Button>
      {showForm && <CreateLodgeForm />}
    </div>
  );
};

export default AddLodge;
