import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSettings } from './useUpdateSettings';

const UpdateSettingsForm = () => {
  const {
    isLoading,
    settings: {
      min_booking_length: minBookingLength,
      max_booking_length: maxBookingLength,
      max_guests_per_booking: maxGuestsPerBooking,
      breakfast_price: breakfastPrice,
    } = {},
    error,
  } = useSettings();

  const { isUpdating, updateSettings } = useUpdateSettings();

  const handleUpdate = (e, field) => {
    const { value } = e.target;
    console.log(value);

    if (!value) {
      return;
    } else {
      updateSettings({ [field]: value });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, 'min_booking_length')}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, 'max_booking_length')}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, 'max_guests_per_booking')}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, 'breakfast_price')}
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
