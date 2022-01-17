import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Button from "./Button";

interface BasicCardProps {
  primary?: boolean;
}

const StyledBasicCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #16122e;
  border-radius: 14px;
  margin: 0 0.8rem;

  border: ${(props: BasicCardProps) => (props.primary ? "1px" : "0px")} solid transparent;
  background: linear-gradient(#16122e, #16122e),
    ${(props: BasicCardProps) =>
      props.primary
        ? "linear-gradient(to right, var(--primary), var(--secondary))"
        : "linear-gradient(#16122e, #16122e)"};
  background-origin: border-box;
  background-clip: padding-box, border-box;

  max-width: 40.7rem;
  padding: 3.3rem 0;
  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    padding: 2rem 0;
    margin: 0;
  }
`;

const Label = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0.15px;
  color: var(--sub);
  text-transform: capitalize;

  @media (max-width: 600px) {
  }
`;

const Number = styled.div`
  font-weight: 700;
  line-height: 4.2rem;
  letter-spacing: 0.25px;

  font-size: 2.8rem;
  @media (max-width: 600px) {
    font-size: 2.4rem;
  }
`;

const SubValue = styled.div`
  font-weight: 500;
  letter-spacing: 0.14px;
  opacity: 0.5;

  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const ButtonContainer = styled.div`
  height: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(3.5rem);
`;

export interface BasicCardType {
  label: string;
  value: string;
  subValue?: string;
  buttonText?: string;
  buttonAction?: () => void;
  primary?: boolean;
}

const BasicCard = ({
  label,
  value,
  subValue,
  buttonText,
  buttonAction,
  primary,
}: BasicCardType): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledBasicCard key={label} primary={primary}>
      <Label>{t(label)}</Label>
      <Number>{value}</Number>
      {subValue && <SubValue>{t(subValue)}</SubValue>}
      {buttonText && buttonAction && (
        <ButtonContainer>
          <Button primary medium width="13rem" text={buttonText} click={buttonAction} />
        </ButtonContainer>
      )}
    </StyledBasicCard>
  );
};

export default BasicCard;