import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const imgSrc = `/logo-${isDarkMode ? "dark" : "light"}.png`;

  return (
    <StyledLogo>
      <Link to="dashboard">
        <Img src={imgSrc} alt="Logo" />
      </Link>
    </StyledLogo>
  );
}

export default Logo;
