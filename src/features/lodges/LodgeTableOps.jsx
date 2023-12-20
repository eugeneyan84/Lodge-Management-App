import TableOps from '../../ui/TableOps';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

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
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
        ]}
      />
    </TableOps>
  );
};

export default LodgeTableOps;
