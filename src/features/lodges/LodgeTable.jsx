import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import LodgeRow from './LodgeRow';
import { useLodges } from './useLodges';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Table_old = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const LodgeTable = () => {
  const { isLoading, lodges, error } = useLodges();

  if (isLoading) {
    return <Spinner />;
  }

  const renderLodgeRecords = (lodge) => {
    return <LodgeRow key={lodge.id} lodge={lodge} />;
  };

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Lodge</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body data={lodges} renderFn={renderLodgeRecords} />
      </Table>
    </Menus>
  );
};

export default LodgeTable;
