import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { useBackd } from "../../../../app/hooks/use-backd";
import { AppDispatch } from "../../../../app/store";
import Popup from "../../../../components/Popup";
import { Position, Pool, TransactionInfo, fromPlainPosition } from "../../../../lib/types";
import { removePosition } from "../../../../state/positionsSlice";
import { selectTransactions } from "../../../../state/transactionsSlice";
import Button from "../../../../components/Button";

const ButtonContainer = styled.div`
  width: 100%;
  display: grid;
  margin-top: 4rem;

  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.7rem;
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1.8rem;
  }
`;

interface Props {
  show: boolean;
  close: () => void;
  position: Position;
  pool: Pool;
  complete: () => void;
}

const DeleteTopupConfirmation = ({ show, close, position, pool, complete }: Props): JSX.Element => {
  const { t } = useTranslation();
  const backd = useBackd();
  const dispatch = useDispatch<AppDispatch>();
  const [initialised, setInitialised] = useState(false);
  const pendingTx = useSelector(selectTransactions);

  const loading = pendingTx.some(
    (tx: TransactionInfo) =>
      tx.confirmations === 0 &&
      tx.description.action === "Remove" &&
      fromPlainPosition(tx.description.args?.plainPosition).account === position.account &&
      fromPlainPosition(tx.description.args?.plainPosition).protocol === position.protocol
  );

  useEffect(() => {
    if (initialised && !loading) {
      complete();
      close();
    }
    setInitialised(true);
    return () => {
      setInitialised(false);
    };
  }, [loading]);

  const handleRemovePosition = () => {
    if (!backd) return;
    dispatch(removePosition({ backd, pool, position }));
  };

  return (
    <Popup
      id="delete-topup-confirmation"
      show={show}
      close={close}
      header={t("actions.topup.delete.header")}
      body={t("actions.topup.delete.body", {
        asset: pool.underlying.symbol,
        max: position.maxTopUp.toCryptoString(),
        protocol: position.protocol,
      })}
      loading={loading}
    >
      <ButtonContainer>
        <Button
          id="delete-topup-confirmation-cancel"
          medium
          background="var(--bg-light)"
          neutral
          click={() => close()}
        >
          {t("actions.topup.delete.cancel")}
        </Button>
        <Button
          id="delete-topup-confirmation-button"
          medium
          primary
          destructive
          loading={loading}
          click={() => handleRemovePosition()}
        >
          {t("actions.topup.delete.header")}
        </Button>
      </ButtonContainer>
    </Popup>
  );
};

export default DeleteTopupConfirmation;
