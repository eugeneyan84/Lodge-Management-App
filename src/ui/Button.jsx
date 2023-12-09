import styled from 'styled-components';

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  // ampersand serves as handle for currently selected element
  &:hover {
    background-color: var(--color-brand-700);
  }
`;

export default Button;
