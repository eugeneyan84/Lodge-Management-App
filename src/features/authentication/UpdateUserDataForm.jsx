import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

const UpdateUserDataForm = () => {
  // isLoading state not needed, as user data is guaranteed to be immediate available at this protected page
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateCurrentUser, isPending: isUpdatingUser } = useUpdateUser();
  console.log(`isLoading: ${isUpdatingUser}`);

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName) {
      return;
    } else {
      updateCurrentUser(
        { fullName, avatar },
        {
          onSuccess: () => {
            setAvatar(null);
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setFullName(currentFullName); // obtained from useUser hook, guaranteed to be the original full name
    setAvatar(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          onClick={handleCancel}
          disabled={isUpdatingUser}
        >
          Reset
        </Button>
        <Button disabled={isUpdatingUser}>Update account</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
