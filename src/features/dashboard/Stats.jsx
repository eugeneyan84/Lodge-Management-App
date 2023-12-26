import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

const Stats = ({ bookings, confirmedStays, numDays, lodgeCount }) => {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, current) => {
    return acc + current.total_price;
  }, 0);

  const numCheckins = confirmedStays.length;

  const totalConfirmedNights = confirmedStays.reduce((acc, current) => {
    return acc + current.num_nights;
  }, 0);
  console.log(
    `totalConfirmedNights: ${totalConfirmedNights}, numDays: ${numDays}, lodgeCount: ${lodgeCount}`
  );
  const occupancyRate = (totalConfirmedNights / (numDays * lodgeCount)) * 100;

  return (
    <>
      <Stat
        title="Bookings"
        color="orange"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numCheckins}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${occupancyRate.toFixed(0)}%`}
      />
    </>
  );
};

export default Stats;
