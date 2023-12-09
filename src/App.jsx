import GlobalStyles from './styles/GlobalStyles';
import Input from './ui/Input';
import Button from './ui/Button';
import Heading from './ui/Heading';
import Row from './ui/Row';

const App = () => {
  const handleClick = () => {
    alert(`Button clicked!`);
  };

  return (
    <>
      <GlobalStyles />
      <div>
        <Row type="horizontal">
          <Heading as="h1">Test H1</Heading>
          <div>
            <Heading as="h2">Test H2 header</Heading>
            <Input placeholder="No. of guests" />
            <Button variation="primary" size="medium" onClick={handleClick}>
              Test Button
            </Button>
          </div>
        </Row>

        <Row>
          <Heading as="h3">Test H3</Heading>
          <form>
            <Input type="number" placeholder="No. of nights" />
            <Input type="number" placeholder="No. of towels" />
            <Button variation="secondary" size="small">
              Test Btn again
            </Button>
          </form>
        </Row>
      </div>
    </>
  );
};

export default App;
