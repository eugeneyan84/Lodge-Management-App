import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import FormRow from '../../ui/FormRow';
import { useCreateLodge } from './useCreateLodge';
import { useEditLodge } from './useEditLodge';
import TextArea from '../../ui/TextArea';

const CreateLodgeForm = ({ lodgeToEdit = {}, onCloseModal }) => {
  const {
    id: editId,
    max_capacity: maxCapacity,
    regular_price: regularPrice,
    image_url: image,
    ...editValuesRaw
  } = lodgeToEdit;
  const editValues = { ...editValuesRaw, maxCapacity, regularPrice, image };
  //console.log(editValues);
  const isEditSession = Boolean(editId);
  console.log(isEditSession);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createLodge } = useCreateLodge();

  const { isEditing, editLodge } = useEditLodge();

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    console.log(data);
    if (isEditSession) {
      console.log(data);
      editLodge(
        { newLodgeData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset(getValues());
            onCloseModal?.();
          },
        }
      );
    } else {
      createLodge(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  const onError = (errors) => {
    // perform actions on errors if necessary
    console.error(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Lodge name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'Name value is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'Max capacity value is required',
            min: { value: 1, message: 'Minimum value of 1 required' },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'Regular price value is required',
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'Discount vaue is required',
            min: { value: 0, message: 'Minimum value of 0 required' },
            validate: (value) => {
              value <= getValues().regularPrice ||
                'Discount cannot be greater than regular price';
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <TextArea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register('description', {
            required: 'Description value is required',
          })}
        />
      </FormRow>

      <FormRow label="Lodge photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'Image is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit Lodge' : 'Add Lodge'}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateLodgeForm;
