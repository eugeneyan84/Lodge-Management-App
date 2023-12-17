import { useEffect, useRef } from 'react';

const useOutsideClick = (handler, listenCapturing = true) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log('Clicked outside of StyledModal');
        handler();
      }
    };
    document.addEventListener('click', handleClick, listenCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);
  return ref;
};

export default useOutsideClick;
