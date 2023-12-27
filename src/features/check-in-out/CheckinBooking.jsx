import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveback } from '../../hooks/useMoveback';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckin';
import { useSettings } from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const {
    id: bookingId,
    guests,
    total_price: totalPrice,
    num_guests: numGuests,
    has_breakfast: hasBreakfast,
    num_nights: numNights,
  } = booking ?? {};
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const optionalBreakfastPrice =
    settings?.breakfast_price * numGuests * numNights;

  const moveBack = useMoveback();
  const { checkin, isCheckingIn } = useCheckin();

  console.log(booking);

  const handleCheckin = () => {
    if (!confirmPaid) {
      return;
    } else {
      if (addBreakfast) {
        checkin({
          bookingId,
          breakfast: {
            has_breakfast: true,
            extras_price: optionalBreakfastPrice,
            total_price: optionalBreakfastPrice + totalPrice,
          },
        });
      } else {
        checkin({ bookingId, breakfast: {} });
      }
    }
  };

  const handleAddBreakfast = () => {
    setAddBreakfast((bf) => !bf);
    setConfirmPaid(false);
  };

  useEffect(() => {
    setConfirmPaid(booking?.is_paid ?? false);
  }, [booking]);

  //const booking = {};
  if (isLoading || isLoadingSettings) {
    return <Spinner />;
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={handleAddBreakfast}
            id="breakfast"
          >
            Add breakfast option for ${formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          Staff confirmation of guest <strong>{guests.full_name}</strong>
          paid full amount{' '}
          <strong>
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(
                  optionalBreakfastPrice + totalPrice
                )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  optionalBreakfastPrice
                )})`}
          </strong>
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CheckinBooking;
