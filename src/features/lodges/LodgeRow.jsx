import styled from 'styled-components';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import { formatCurrency } from '../../utils/helpers';
import CreateLodgeForm from './CreateLodgeForm';
import { useDeleteLodge } from './useDeleteLodge';
import { useCreateLodge } from './useCreateLodge';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

const TableRow_old = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const LodgeRow = ({ lodge }) => {
  const {
    id: lodgeId,
    name,
    max_capacity: maxCapacity,
    regular_price: regPrice,
    discount,
    image_url: image,
    description,
  } = lodge;

  //const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteLodge } = useDeleteLodge();
  const { isCreating, createLodge } = useCreateLodge();

  const handleDuplicate = () => {
    createLodge({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice: regPrice,
      discount,
      image,
      description,
    });
  };

  return (
    <Table.Row>
      <Img src={image} />
      <Name>{name}</Name>
      <div>{maxCapacity} guests</div>
      <Price>{formatCurrency(regPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button disabled={isCreating} onClick={handleDuplicate}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="edit">
            <button>{<HiPencil />}</button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateLodgeForm lodgeToEdit={lodge} />
          </Modal.Window>
          <Modal.Open opens="delete">
            <button onClick={() => deleteLodge(lodgeId)} disabled={isDeleting}>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={name}
              onConfirm={() => deleteLodge(lodgeId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default LodgeRow;
