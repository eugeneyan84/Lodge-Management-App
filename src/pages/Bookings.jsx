import BookingTable from '../features/bookings/BookingTable';
import BookingTableOps from '../features/bookings/BookingTableOps';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

const Bookings = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Bookings</Heading>
        <BookingTableOps />
      </Row>

      <BookingTable />
    </>
  );
};

export default Bookings;
