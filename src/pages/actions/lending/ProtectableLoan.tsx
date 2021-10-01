import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router";

import { Lending } from "../../../state/lendingSlice";
import { selectEthPrice } from "../../../state/poolsListSlice";
import Button from "../../../components/Button";

const StyledProtectableLoan = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.4rem;
  padding: 1.3rem 1.4rem;
  margin-top: 1rem;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.2px;
  opacity: 0.6;
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.2px;
`;

interface Props {
  protocol: string;
  loan?: Lending;
}

const ProtectableLoan = ({ protocol, loan }: Props) => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const history = useHistory();
  const ethPrice = useSelector(selectEthPrice);

  if (!loan) return <></>;

  return (
    <StyledProtectableLoan>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.protocol")}</Header>
        <Value>{protocol}</Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.healthFactor")}</Header>
        <Value>{loan.healthFactor.toCryptoString()}</Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.totalCollateral")}</Header>
        <Value>{loan.totalCollateralETH.toUsdValue(ethPrice)}</Value>
      </Column>
      <Column>
        <Header>{t("actions.suggestions.topup.labels.totalLoan")}</Header>
        <Value>{loan.totalDebtETH.toUsdValue(ethPrice)}</Value>
      </Column>
      <Column>
        <Button
          medium
          text={t("actions.suggestions.topup.register")}
          background="#3A3550"
          click={() => history.push(`/actions/register/topup/${account}/${protocol.toLowerCase()}`)}
        />
      </Column>
    </StyledProtectableLoan>
  );
};

export default ProtectableLoan;