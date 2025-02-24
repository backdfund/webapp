import { CircularProgress } from "@material-ui/core";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectError } from "../state/errorSlice";
import HoverFeedback from "./HoverFeedback";

interface ButtonProps {
  primary?: boolean;
  large?: boolean;
  medium?: boolean;
  small?: boolean;
  tiny?: boolean;
  square?: boolean;
  uppercase?: boolean;
  loading?: boolean;
  wide?: boolean;
  disabled?: boolean;
  inactive?: boolean;
  complete?: boolean;
  background?: string;
  width?: string;
  destructive?: boolean;
  neutral?: boolean;
  borderless?: boolean;
}

const StyledButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: ${(props: ButtonProps) => (props.complete ? "auto" : "pointer")};
  pointer-events: ${(props: ButtonProps) => (props.inactive ? "none" : "auto")};

  width: ${(props: ButtonProps) => {
    if (props.width) return props.width;
    if (props.wide) return "100%";
    return "auto";
  }};
  height: ${(props: ButtonProps) => {
    if (props.large) return props.primary ? "6.2rem" : "6.4rem";
    if (props.medium) return props.primary ? "4.6rem" : "4.8rem";
    if (props.small) return props.primary ? "2.8rem" : "3rem";
    if (props.tiny) return props.primary ? "2.3rem" : "2.5rem";
    if (props.square) return props.primary ? "5.6rem" : "5.8rem";
    return props.primary ? "3.8rem" : "4rem";
  }};
  border-radius: ${(props: ButtonProps) => {
    if (props.large) return "3.2rem";
    if (props.medium) return "1.5rem";
    if (props.square) return "1.5rem";
    if (props.small) return "0.5rem";
    if (props.tiny) return "0.8rem";
    return "2rem";
  }};
  padding: 0
    ${(props: ButtonProps) => {
      if (props.large) return "5rem";
      if (props.medium) return "1.9rem";
      if (props.small) return "1.1rem";
      if (props.tiny) return "0.9rem";
      if (props.square) return "3rem";
      return "2.6rem";
    }};

  /* Background and animations  */
  transition: background-position 0.5s;
  background-size: 200% auto;
  border: ${(props: ButtonProps) => (props.primary || props.borderless ? "0" : "1px")} solid
    transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-image: ${(props: ButtonProps) => {
    if (props.borderless) return "transparent";
    if (props.disabled) return "linear-gradient(#535068, #535068)";
    if (props.destructive) return "linear-gradient(var(--error), var(--error))";
    if (props.complete) return "linear-gradient(#16C784, #16C784)";
    if (props.primary)
      return "linear-gradient(to right, var(--primary-gradient) 0%, var(--secondary-gradient) 50%, var(--primary-gradient) 100%)";
    if (props.neutral)
      return `linear-gradient(${props.background ? props.background : "var(--bg)"}, ${
        props.background ? props.background : "var(--bg)"
      }), linear-gradient(var(--sub), var(--sub))`;
    return `linear-gradient(${props.background ? props.background : "var(--bg)"}, ${
      props.background ? props.background : "var(--bg)"
    }), linear-gradient(to right, var(--primary-gradient) 0%, var(--secondary-gradient) 50%, var(--primary-gradient) 100%)`;
  }};

  :hover {
    background-position: right center;

    div {
      background-position: right center;
    }
  }

  :disabled {
    cursor: auto;
  }

  /* Mobile */
  @media (max-width: 600px) {
    height: ${(props: ButtonProps) => {
      if (props.square) return "2.6rem";
      if (props.small) return "2.8rem";
      if (props.tiny) return "2.3rem";
      if (props.primary) return "4.8rem";
    }};
    border-radius: ${(props: ButtonProps) => {
      if (props.square) return "0.4rem";
      if (props.small) return "0.4rem";
      if (props.tiny) return "0.7rem";
      if (props.medium) return "1.4rem";
      if (props.primary) return "2.4rem";
      return "1.9rem";
    }};
    padding: 0
      ${(props: ButtonProps) => {
        if (props.square) return "1rem";
        if (props.small) return "1.1rem";
        if (props.tiny) return "0.9rem";
        if (props.primary) return "5.2rem";
      }};
  }
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;

  div:nth-child(2) {
    margin-left: 1.9rem;
  }
`;

const Text = styled.div`
  white-space: nowrap;

  color: ${(props: ButtonProps) => {
    if (props.disabled) return "rgba(0, 0, 0, 0.43)";
    if (props.neutral) return "var(--sub)";
    return "var(--main)";
  }};
  text-transform: ${(props: ButtonProps) => {
    if (props.large) return "none";
    if (props.medium) return "none";
    if (props.uppercase) return "uppercase";
    return "capitalize";
  }};
  letter-spacing: ${(props: ButtonProps) => {
    if (props.large) return "0";
    return "0.46px";
  }};
  line-height: ${(props: ButtonProps) => {
    if (props.large) return "2.8rem";
    if (props.tiny) return "1.8rem";
    return "2.6rem";
  }};
  font-size: ${(props: ButtonProps) => {
    if (props.large) return "2.1rem";
    if (props.small) return "1.3rem";
    if (props.tiny) return "1.2rem";
    if (props.square) return "1.4rem";
    return "1.5rem";
  }};
  font-weight: ${(props: ButtonProps) => {
    if (props.large) return "700";
    if (props.square) return "700";
    return "500";
  }};
  background: ${(props: ButtonProps) => {
    if (props.primary) return "none";
    if (props.neutral) return "none";
    return "linear-gradient(to right, var(--primary-gradient) 0%, var(--secondary-gradient) 50%, var(--primary-gradient) 100%)";
  }};
  background-size: 200% auto;
  transition: background-position 0.5s;
  background-clip: ${(props: ButtonProps) => {
    if (props.primary) return "none";
    if (props.neutral) return "none";
    return "text";
  }};
  -webkit-background-clip: ${(props: ButtonProps) => {
    if (props.primary) return "none";
    if (props.neutral) return "none";
    return "text";
  }};
  -webkit-text-fill-color: ${(props: ButtonProps) => {
    if (props.primary) return "none";
    if (props.neutral) return "none";
    return "transparent";
  }};

  @media (max-width: 600px) {
    font-size: ${(props: ButtonProps) => {
      if (props.large) return "1.4rem";
      if (props.small) return "1.4rem";
      if (props.tiny) return "1.2rem";
      if (props.square) return "1.2rem";
      return "1.4rem";
    }};

    font-weight: ${(props: ButtonProps) => {
      if (props.large) return "700";
      if (props.square) return "500";
      return "500";
    }};
  }
`;

interface Props {
  children: ReactNode;
  click?: () => void;
  primary?: boolean;
  large?: boolean;
  medium?: boolean;
  small?: boolean;
  tiny?: boolean;
  square?: boolean;
  uppercase?: boolean;
  loading?: boolean;
  submit?: boolean;
  wide?: boolean;
  disabled?: boolean;
  inactive?: boolean;
  complete?: boolean;
  background?: string;
  hoverText?: string;
  width?: string;
  destructive?: boolean;
  neutral?: boolean;
  id?: string;
  borderless?: boolean;
}

const Button = (props: Props): JSX.Element => {
  const error = useSelector(selectError);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (error || props.loading) setPending(false);
    return () => {
      setPending(false);
    };
  }, [error, props.loading]);

  return (
    <HoverFeedback text={props.disabled ? props.hoverText : ""}>
      <StyledButton
        id={props.id}
        type={props.submit ? "submit" : "button"}
        primary={props.primary}
        large={props.large}
        medium={props.medium}
        small={props.small}
        tiny={props.tiny}
        square={props.square}
        wide={props.wide}
        disabled={props.disabled || props.loading || pending}
        complete={props.complete}
        inactive={props.inactive}
        background={props.background}
        width={props.width}
        destructive={props.destructive}
        neutral={props.neutral}
        borderless={props.borderless}
        onClick={() => {
          if (props.loading || pending || props.disabled || !props.click) return;
          if (props.loading !== undefined) setPending(true);
          props.click();
        }}
      >
        <TextContainer>
          {props.loading && <CircularProgress size={props.large ? 31 : 17} />}
          <Text
            primary={props.primary}
            large={props.large}
            medium={props.medium}
            small={props.small}
            tiny={props.tiny}
            square={props.square}
            uppercase={props.uppercase}
            disabled={props.disabled}
            neutral={props.neutral}
          >
            {props.children}
          </Text>
        </TextContainer>
      </StyledButton>
    </HoverFeedback>
  );
};

export default Button;
