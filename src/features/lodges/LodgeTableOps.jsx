import TableOps from '../../ui/TableOps';
import Filter from '../../ui/Filter';

const LodgeTableOps = () => {
  return (
    <TableOps>
      <Filter
        filterField="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No discount' },
          { value: 'with-discount', label: 'With discount' },
        ]}
      />
    </TableOps>
  );
};

export default LodgeTableOps;
