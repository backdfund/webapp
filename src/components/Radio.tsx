import React from "react";
import styled from "styled-components";

export type RadioOptionType = {
  label: string;
  value: string;
};

const StyledRadio = styled.div`
  position: relative;
  display: flex;
`;

type OptionProps = {
  active: boolean;
};

const RadioOption = styled.button`
  text-transform: capitalize;
  position: relative;
  width: 15.2rem;
  height: 4.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;

  transition: color 0.3s;
  font-weight: 700;
  color: ${(props: OptionProps) => (props.active ? "var(--main)" : "var(--sub)")};

  :hover {
    color: var(--main);
  }
`;

type IndicatorProps = {
  activeIndex: number;
};

const ActiveIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 15.2rem;
  height: 4.9rem;
  border-radius: 1.2rem;
  background-color: #322c4b;
  transition: transform 0.3s;
  transform: ${(props: IndicatorProps) => `translateX(${props.activeIndex * 15.2}rem)`};
`;

type Props = {
  options: RadioOptionType[];
  active: string;
  setOption: (value: string) => void;
};

const Radio = (props: Props) => {
  return (
    <StyledRadio>
      <ActiveIndicator
        activeIndex={props.options
          .map((option: RadioOptionType) => option.value)
          .indexOf(props.active)}
      />
      {props.options.map((option: RadioOptionType) => (
        <RadioOption
          key={option.label}
          onClick={() => props.setOption(option.value)}
          active={option.value === props.active}
        >
          {option.label}
        </RadioOption>
      ))}
    </StyledRadio>
  );
};

export default Radio;
