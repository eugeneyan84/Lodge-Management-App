import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLodge } from '../../services/apiLodges';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

const CreateLodgeForm = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createLodge,
    onSuccess: () => {
      toast.success('New lodge successfully created');
      queryClient.invalidateQueries({ queryKey: ['lodges'] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    mutate({ ...data, image: data.image[0] });
  };

  const onError = (errors) => {
    // perform actions on errors if necessary
    console.error(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Lodge name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', { required: 'Name value is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
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
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'Regular price value is required',
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
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
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
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
          ß
          disabled={isCreating}
          {...register('image', {
            required: 'Image is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add lodge</Button>
      </FormRow>
    </Form>
  );
};

export default CreateLodgeForm;
