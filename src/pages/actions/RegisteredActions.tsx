import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import ContentSection from "../../components/ContentSection";
import { Position } from "../../lib/types";
import { selectPositions } from "../../state/positionsSlice";
import Button from "../../components/Button";
import RegisteredAction from "./RegisteredAction";

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Empty = styled.div`
  font-size: 1.5rem;
  line-height: 2.1rem;
  letter-spacing: 0.46px;
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

const RegisteredActions = () => {
  const { t } = useTranslation();
  const positions = useSelector(selectPositions);
  const history = useHistory();

  const hasPosition = positions.length > 0;

  return (
    <ContentSection
      header={t("actions.registered.header")}
      content={
        <Content>
          {!hasPosition && <Empty>{t("actions.registered.empty")}</Empty>}
          {hasPosition &&
            positions.map((position: Position) => <RegisteredAction position={position} />)}
          <ButtonContainer>
            <Button
              primary={!hasPosition}
              medium
              width="44%"
              background="#0F0830"
              text={t("actions.register.button")}
              click={() => history.push("/actions/register")}
            />
          </ButtonContainer>
        </Content>
      }
    />
  );
};

export default RegisteredActions;