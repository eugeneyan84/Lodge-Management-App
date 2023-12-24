import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

const SignupForm = () => {
  // when register function is called within element in jsx, it will
  // create a few props which is then spread onto the targeted element
  const { register, formState } = useForm();

  const { errors } = formState;

  return (
    <Form>
      <FormRow label="Full name" error={''}>
        <Input
          type="text"
          id="fullName"
          {...register('fullName', { required: 'Mandatory field' })}
        />
      </FormRow>

      <FormRow label="Email address" error={''}>
        <Input
          type="email"
          id="email"
          {...register('email', { required: 'Mandatory field' })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={''}>
        <Input
          type="password"
          id="password"
          {...register('password', { required: 'Mandatory field' })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={''}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', { required: 'Mandatory field' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
