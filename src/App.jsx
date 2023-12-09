import GlobalStyles from './styles/GlobalStyles';
import Input from './ui/Input';
import Button from './ui/Button';
import Heading from './ui/Heading';

const App = () => {
  const handleClick = () => {
    alert(`Button clicked!`);
  };

  return (
    <>
      <GlobalStyles />
      <div>
        <Heading as="h1">Test H1</Heading>
        <Button onClick={handleClick}>Test Button</Button>
        <Input placeholder="No. of guests" />

        <Heading as="h3">Test H3</Heading>
      </div>
    </>
  );
};

export default App;
