import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ScaledNumber } from "scaled-number";

import AmountInput from "../../components/AmountInput";
import ApproveThenAction from "../../components/ApproveThenAction";
import { Token } from "../../lib/types";
import { useDevice } from "../../app/hooks/use-device";
import { selectEthBalance } from "../../state/userSlice";
import ExternalLink from "../../components/ExternalLink";

const StyledUnstakeTokens = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;

  font-size: 1.8rem;
  line-height: 2.6rem;
  margin-bottom: 3.7rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
    line-height: 1.9rem;
    margin-bottom: 1.7rem;
  }
`;

const Content = styled.div`
  width: 100%;
  display: grid;
  align-items: flex-end;
  grid-gap: 1.8rem;

  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

interface Props {
  token: Token;
}

const UnstakeTokens = ({ token }: Props): JSX.Element => {
  const { t } = useTranslation();
  const balance = useSelector(selectEthBalance); // TODO This is not the correct balance
  const { isMobile } = useDevice();

  const [value, setValue] = useState("");

  const unstake = async () => {
    setValue("");
  };

  return (
    <StyledUnstakeTokens>
      <Description>
        {t("stake.tabs.unstake.description")}{" "}
        <ExternalLink large link="">
          {t("stake.tabs.unstake.more")}
        </ExternalLink>
      </Description>
      <Content>
        <AmountInput
          noSlider
          value={value}
          setValue={(v: string) => setValue(v)}
          label={
            isMobile ? t("stake.tabs.unstake.inputMobile") : t("stake.tabs.unstake.inputDesktop")
          }
          balance={balance}
          error=""
          symbol="DAI"
        />
        <ApproveThenAction
          stepsOnTop
          label={t("stake.tabs.unstake.action")}
          action={unstake}
          value={ScaledNumber.fromUnscaled(value)}
          loading={false}
          disabled={!value}
          token={token}
          contract=""
        />
      </Content>
    </StyledUnstakeTokens>
  );
};

export default UnstakeTokens;
