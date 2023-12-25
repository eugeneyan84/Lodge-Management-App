import { useDarkMode } from '../context/ColourModeContext';
import ButtonIcon from './ButtonIcon';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

const ColourThemeToggle = () => {
  const { isDarkMode, toggleColourMode } = useDarkMode();

  const handleColourModeToggle = () => {
    toggleColourMode();
  };

  return (
    <ButtonIcon onClick={handleColourModeToggle}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
};

export default ColourThemeToggle;
