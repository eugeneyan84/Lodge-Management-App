import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const ColourModeContext = createContext();

const ColourModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleColourMode = () => {
    setIsDarkMode((mode) => !mode);
  };

  return (
    <ColourModeContext.Provider value={{ isDarkMode, toggleColourMode }}>
      {children}
    </ColourModeContext.Provider>
  );
};

const useDarkMode = () => {
  const context = useContext(ColourModeContext);
  if (context === undefined) {
    throw new Error(
      'ColourModeContext cannot be used outside scope of ColourModeProvider'
    );
  }
  return context;
};

export { ColourModeProvider, useDarkMode };
