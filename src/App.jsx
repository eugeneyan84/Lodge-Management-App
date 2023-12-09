import GlobalStyles from './styles/GlobalStyles';
import Input from './ui/Input';
import Button from './ui/Button';

const App = () => {
  const handleClick = () => {
    alert(`Button clicked!`);
  };

  return (
    <>
      <GlobalStyles />
      <div>
        <Button onClick={handleClick}>Test Button</Button>
        <Input placeholder="No. of guests" />
      </div>
    </>
  );
};

export default App;
