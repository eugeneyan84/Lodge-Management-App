import BookingTable from '../features/bookings/BookingTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

const Bookings = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Bookings</Heading>
        <p>test paragraph</p>
      </Row>

      <BookingTable />
    </>
  );
};

export default Bookings;
