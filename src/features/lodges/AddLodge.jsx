import { useState } from 'react';

import Button from '../../ui/Button';
import CreateLodgeForm from './CreateLodgeForm';
import Modal from '../../ui/Modal';
import LodgeTable from './LodgeTable';

const AddLodge = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="lodge-form">
          <Button>Add new Lodge</Button>
        </Modal.Open>
        <Modal.Window name="lodge-form">
          <CreateLodgeForm />
        </Modal.Window>

        {/*<Modal.Open opens="table">
        <Button>Display table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <LodgeTable />
      </Modal.Window>*/}
      </Modal>
    </div>
  );
};

const AddLodge_old = () => {
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
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateLodgeForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default AddLodge;
