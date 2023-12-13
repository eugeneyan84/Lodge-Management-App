import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLodge } from '../../services/apiLodges';
import toast from 'react-hot-toast';
import { useState } from 'react';
import CreateLodgeForm from './CreateLodgeForm';

const TableRow = styled.div`
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
  const [showForm, setShowForm] = useState(false);

  const {
    id: lodgeId,
    name,
    max_capacity: maxCapacity,
    regular_price: regPrice,
    discount,
    image_url: image,
  } = lodge;

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteLodge,
    onSuccess: () => {
      toast.success('Lodge entry successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['lodges'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <>
      <TableRow role="row">
        <img src={image} />
        <Name>{name}</Name>
        <div>{maxCapacity} guests</div>
        <Price>{formatCurrency(regPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>
          <button onClick={() => mutate(lodgeId)} disabled={isDeleting}>
            Delete
          </button>
        </div>
      </TableRow>
      {showForm && <CreateLodgeForm lodgeToEdit={lodge} />}
    </>
  );
};

export default LodgeRow;
