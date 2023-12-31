import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import { useBookings } from './useBookings';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';

const BookingTable = () => {
  const { isLoading, bookings, error, count } = useBookings();

  if (isLoading) {
    return <Spinner />;
  }

  if (!bookings.length) {
    return <Empty resource="bookings" />;
  }

  const renderBookingRecords = (booking) => {
    return <BookingRow key={booking.id} booking={booking} />;
  };

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Lodge</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        {<Table.Body data={bookings} renderFn={renderBookingRecords} />}
        <Table.Footer>
          <Pagination resultCount={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default BookingTable;
