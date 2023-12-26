import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { useLodges } from '../lodges/useLodges';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoading } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isLoading: isStaysLoading,
    numDays,
  } = useRecentStays();

  const { lodges, isLoading: isLodgesLoading } = useLodges();

  if (isLoading || isStaysLoading || isLodgesLoading) {
    return <Spinner />;
  }

  //console.log(bookings);
  //console.log(isLoading);
  //console.log(stays);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        lodgeCount={lodges.length}
      />
      <div>Today's movement</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
