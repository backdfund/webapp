import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import chevron from "../../assets/ui/chevron.svg";
import Asset from "../../components/Asset";
import Button from "../../components/Button";
import GradientText from "../../styles/GradientText";
import { selectPrices } from "../../features/pools-list/poolsListSlice";
import { selectBalances } from "../../features/user/userSlice";
import { Pool } from "../../lib";

type RowProps = {
  preview?: boolean;
};

const Row = styled.tr`
  height: ${(props: RowProps) => (props.preview ? "5.6rem" : "7.2rem")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;
  background-color: #141128;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  padding: 0 1.7rem;
  cursor: pointer;

  :hover {
    background-color: #1a1438;
  }
`;

type DataProps = {
  right?: boolean;
};

const Data = styled.td`
  display: flex;
  flex: 1;
  align-items: center;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.4rem;
  letter-spacing: 0.15px;
  justify-content: ${(props: DataProps) => (props.right ? "flex-end" : "flex-start")};
`;

const Apy = styled(GradientText)`
  font-weight: 900;
  font-size: 1.6rem;
  line-height: 2rem;
  letter-spacing: 0.15px;
`;

const ChevronData = styled.td`
  width: 2.4rem;
`;

const Chevron = styled.img`
  height: 2.4rem;
  width: 2.4rem;
`;

type Props = {
  pool: Pool;
  preview?: boolean;
};

const PoolsRow = ({ pool, preview }: Props) => {
  const history = useHistory();

  const prices = useSelector(selectPrices);
  const balances = useSelector(selectBalances);

  const getBalance = (pool: Pool) => balances[pool.lpToken.address] || 0;
  const getPrice = (pool: Pool) => prices[pool.underlying.symbol] || 0;

  return (
    <Row onClick={() => history.push(`/pool/${pool.lpToken.symbol}`)} preview={preview}>
      <Data>
        <Asset token={pool.underlying} />
      </Data>
      <Data>
        <Apy>{`${pool.apy}%`}</Apy>
      </Data>
      <Data>{`$${(pool.totalAssets * getPrice(pool)).toLocaleString()}`}</Data>
      {!preview && (
        <>
          <Data>{`$${(getBalance(pool) * getPrice(pool)).toLocaleString()}`}</Data>

          <ChevronData>
            <Chevron src={chevron} alt="right arrow" />
          </ChevronData>
        </>
      )}
      {preview && (
        <Data right>
          <Button text="deposit" background="#141128" />
        </Data>
      )}
    </Row>
  );
};

export default PoolsRow;
