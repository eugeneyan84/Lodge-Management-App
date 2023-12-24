import SignupForm from '../features/authentication/SignupForm';
import Heading from '../ui/Heading';

const NewUsers = () => {
  return (
    <>
      <Heading as="h1">New User Creation</Heading>
      <SignupForm />
    </>
  );
};

export default NewUsers;
