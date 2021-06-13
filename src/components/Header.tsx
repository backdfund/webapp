import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import Connector from "./Connector";
import NavItems from "./NavItems";

type HeaderProps = {
  isSticky: boolean;
};

const StyledHeader = styled.div`
  position: relative;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8rem;
  z-index: 1;
  transition: all 0.3s;
  padding: 2.4rem 12.4rem;

  background-color: ${(props: HeaderProps) => (props.isSticky ? "#120e2c" : "transparent")};
  box-shadow: -4px 0px 4px rgba(0, 0, 0, ${(props: HeaderProps) => (props.isSticky ? "0.25" : "0")});
`;

const Logo = styled.img`
  height: 4.8rem;
  cursor: pointer;
`;

const Actions = styled.div`
  display: flex;
`;

const Header = () => {
  const history = useHistory();

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledHeader isSticky={scrollPosition > 40}>
      <Logo onClick={() => history.push("/")} src={logo} />
      <Actions>
        <NavItems />
        <Connector />
      </Actions>
    </StyledHeader>
  );
};

export default Header;
