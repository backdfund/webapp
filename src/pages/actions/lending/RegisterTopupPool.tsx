import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import ContentSection from "../../../components/ContentSection";
import Button from "../../../components/Button";
import BackButton from "../../../components/BackButton";
import RowSelector, { RowOptionType } from "../../../components/RowSelector";
import { selectPools, selectPrices } from "../../../state/poolsListSlice";
import { Pool } from "../../../lib";
import { formatPercent, numberToCompactCurrency } from "../../../lib/numeric";
import { selectBalances } from "../../../state/userSlice";
import { selectPositions } from "../../../state/positionsSlice";
import { ScaledNumber } from "../../../lib/scaled-number";
import { Position } from "../../../lib/types";

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 0.25px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

const RegisterTopupPool = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const pools = useSelector(selectPools);
  const balances = useSelector(selectBalances);
  const positions = useSelector(selectPositions);
  const prices = useSelector(selectPrices);
  const [pool, setPool] = useState("");

  const options: RowOptionType[] = pools.map((pool: Pool) => {
    return {
      value: pool.lpToken.symbol.toLowerCase(),
      columns: [
        {
          label: t("headers.asset"),
          value: pool.underlying.symbol,
        },
        {
          label: t("headers.apy"),
          value: formatPercent(pool.apy),
        },
        {
          label: t("headers.tvl"),
          value: numberToCompactCurrency(pool.totalAssets * prices[pool.underlying.symbol]),
        },
        {
          label: t("headers.deposits"),
          value: (balances[pool.lpToken.address] || new ScaledNumber())
            .add(
              positions
                .filter((position: Position) => position.depositToken === pool.lpToken.symbol)
                .reduce((a: ScaledNumber, b: Position) => a.add(b.maxTopUp), new ScaledNumber())
            )
            .toCompactUsdValue(prices[pool.underlying.symbol]),
        },
      ],
    };
  });

  return (
    <Container>
      <BackButton />
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="3/4"
        content={
          <Content>
            <Header>{t("actions.topup.stages.pool.header")}</Header>
            <RowSelector
              value={pool}
              setValue={(value: string) => setPool(value)}
              options={options}
            />
            <ButtonContainer>
              <Button
                primary
                medium
                width="44%"
                text={t("components.continue")}
                click={() => history.push(`/actions/register/sskdfk/skdfk/ksdkf/sdf`)}
                disabled={!pool}
                hoverText={t("actions.topup.stages.pool.incomplete")}
              />
            </ButtonContainer>
          </Content>
        }
      />
    </Container>
  );
};

export default RegisterTopupPool;