import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';

const SignupForm = () => {
  // when register function is called within element in jsx, it will
  // create a few props which is then spread onto the targeted element
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { signup, isPending: isSigningUp } = useSignup();

  const { errors } = formState;

  const onSubmit = ({ fullName, email, password }) => {
    //console.log(data);
    signup({ fullName, email, password }, { onSettled: reset });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register('fullName', { required: 'Mandatory field' })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register('email', {
            required: 'Mandatory field',
            pattern: {
              value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Please provide a valid email address',
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register('password', {
            required: 'Mandatory field',
            minLength: {
              value: 8,
              message: 'Password length needs to be at least 8 characters',
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'Mandatory field',
            validate: (value) => {
              return (
                value === getValues().password ||
                'Passwords in both fields require an exact match'
              );
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={reset}
          disabled={isSigningUp}
        >
          Reset
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
