import React from "react";
import { Switch, useRouteMatch, Route } from "react-router";
import RegisterTopupConditions from "./RegisterTopupConditions";
import RegisterTopupLoan from "./RegisterTopupLoan";
import RegisterTopupPool from "./RegisterTopupPool";
import RegisterTopupPoolDeposit from "./RegisterTopupPoolDeposit";

const RegisterTopup = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/deposit/:poolName/:address/:protocol`}>
        <RegisterTopupPoolDeposit />
      </Route>
      <Route path={`${match.path}/deposit/:poolName`}>
        <RegisterTopupPoolDeposit />
      </Route>
      <Route path={`${match.path}/:address/:protocol/:poolName`}>
        <RegisterTopupConditions />
      </Route>
      <Route path={`${match.path}/:address/:protocol`}>
        <RegisterTopupPool />
      </Route>
      <Route path={match.path}>
        <RegisterTopupLoan />
      </Route>
    </Switch>
  );
};

export default RegisterTopup;
