import { useSearchParams } from 'react-router-dom';
import Select from './Select';

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByValue = searchParams.get('sortBy') || '';

  const handleSelectionChange = (e) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      value={sortByValue}
      type="white"
      onChange={handleSelectionChange}
    />
  );
};

export default SortBy;
