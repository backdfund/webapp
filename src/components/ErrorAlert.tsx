import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import Popup from "./Popup";
import { Paragraph } from "../styles/Headers";
import { selectError, setError } from "../state/errorSlice";
import { GradientLink } from "../styles/GradientText";
import Button from "./Button";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Text = styled(Paragraph)`
  margin-bottom: 3rem;
`;

const Link = styled(GradientLink)`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  margin-bottom: 1rem;
  margin-left: 0.5rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
`;

export function ErrorAlert(): JSX.Element {
  const error = useSelector(selectError);
  const dispatch: AppDispatch = useDispatch();

  return (
    <Popup
      show={error.message.length > 0}
      close={() => dispatch(setError({ message: "" }))}
      header={error.title || "An Error Occured"}
      content={
        <Content>
          <Text>{error.message}</Text>
          {error.hideContact ? null : (
            <Text>
              Please try again in a moment. If the error persists, you can contact us on
              <Link href="https://discord.gg/jpGvaFV3Rv" target="_blank" rel="noopener noreferrer">
                Discord
              </Link>
            </Text>
          )}
          {error.hideButton ? null : (
            <Button
              medium
              primary
              background="#252140"
              text="Close"
              click={() => dispatch(setError({ message: "" }))}
            />
          )}
        </Content>
      }
    />
  );
}
