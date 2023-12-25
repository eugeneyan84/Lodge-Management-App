import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import Logout from '../features/authentication/Logout';
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.5rem;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/account');
  };

  return (
    <StyledHeaderMenu>
      <Li>
        <UserAvatar />
      </Li>
      <Li>
        <ButtonIcon onClick={handleUserClick}>
          <HiOutlineUser />
        </ButtonIcon>
      </Li>
      <Li>
        <Logout />
      </Li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
