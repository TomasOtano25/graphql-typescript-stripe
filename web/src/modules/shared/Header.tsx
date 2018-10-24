import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { meQuery } from "../../graphql";
import { MeQuery } from "../../schemaTypes";

export class Header extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          height: 50,
          width: "100%",
          backgroundColor: "#fafafa",
          display: "flex",
          justifyContent: "space-around",
          padding: 10
        }}
      >
        <div style={{ flex: 2, textAlign: "center" }}>
          <Link to="/">
            <h2>Stripe Example</h2>
          </Link>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          <Query<MeQuery> /*fetchPolicy="network-only"*/ query={meQuery}>
            {({ data, loading }) => {
              if (loading || !data) {
                return null;
              }

              if (!data.me) {
                return (
                  <div>
                    <div>
                      <Link to="/login">login</Link>
                    </div>
                    <div>
                      <Link to="/register">register</Link>
                    </div>
                  </div>
                );
              }

              return (
                <div>
                  {data.me.email}
                  <div>
                    <Link to="/account">account</Link>
                  </div>
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}
