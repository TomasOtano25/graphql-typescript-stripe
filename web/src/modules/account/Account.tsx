import * as React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import { MeQuery } from "../../schemaTypes";
import { SubscribeUser } from "./SubscribeUser";

import { meQuery } from "../../graphql";
import { ChangeCreditCard } from "./ChangeCreditCard";

export class Account extends React.PureComponent {
  render() {
    return (
      <Query<MeQuery> /*fetchPolicy="network-only"*/ query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          if (!data) {
            return <div>data is undefined</div>;
          }

          if (!data.me) {
            return <Redirect to="/login" />;
            // return <Link to="/login">please login</Link>;
          }

          if (data.me.type === "free-trial") {
            return <SubscribeUser />;
          }
          // return <div>thanks for buying our product</div>;
          // return <Redirect to="/paid-users" />;
          return <ChangeCreditCard />;
          // return (
          //   <p>
          //     {data.me.email} - {data.me.type}
          //   </p>
          // );
        }}
      </Query>
    );
  }
}
