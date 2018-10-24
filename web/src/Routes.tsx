import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Account } from "./modules/account/Account";
import { PaidUsers } from "./modules/account/PaidUsers";
import { SubscribeUser } from "./modules/account/SubscribeUser";
import { LoginView } from "./modules/user/LoginView";
import { MeView } from "./modules/user/MeView";
import { RegisterView } from "./modules/user/RegisterView";

import { ChangeCreditCard } from "./modules/account/ChangeCreditCard";
import { Header } from "./modules/shared/Header";

// react.fragment me permite declarar un grupo de etiquetas como un unico componente
export class Routes extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        {/* <div> */}
        <Switch>
          <Route path="/login" component={LoginView} />
          <Route
            path="/"
            render={() => (
              <React.Fragment>
                <Header />
                <div>
                  <Route path="/register" component={RegisterView} />
                  <Route path="/me" component={MeView} />
                  <Route path="/subscription" component={SubscribeUser} />
                  <Route
                    path="/change-credit-card"
                    component={ChangeCreditCard}
                  />
                  <Route path="/account" component={Account} />
                  <Route path="/paid-users" component={PaidUsers} />
                  <Route
                    exact={true}
                    path="/"
                    render={() => <div>homepage</div>}
                  />
                </div>
              </React.Fragment>
            )}
          />
        </Switch>
        {/* </div> */}
      </BrowserRouter>
    );
  }
}
