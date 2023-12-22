import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOps from '../../ui/TableOps';

const BookingTableOps = () => {
  return (
    <TableOps>
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />

      <SortBy
        options={[
          { value: 'start_date-desc', label: 'Sort by date (recent first)' },
          { value: 'start_date-asc', label: 'Sort by date (earlier first)' },
          {
            value: 'total_price-desc',
            label: 'Sort by amount (high to low)',
          },
          { value: 'total_price-asc', label: 'Sort by amount (low to high)' },
        ]}
      />
    </TableOps>
  );
};

export default BookingTableOps;
