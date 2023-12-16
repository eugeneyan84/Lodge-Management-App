import { useState } from 'react';

import Button from '../../ui/Button';
import CreateLodgeForm from './CreateLodgeForm';
import Modal from '../../ui/Modal';

const AddLodge = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpenModal((show) => !show);
        }}
      >
        Add new Lodge
      </Button>
      {isOpenModal && <Modal />}
    </div>
  );
};

export default AddLodge;
