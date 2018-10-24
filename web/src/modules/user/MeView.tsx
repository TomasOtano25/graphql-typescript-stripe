import * as React from "react";
import { Query } from "react-apollo";
import { MeQuery } from "../../schemaTypes";

import { meQuery } from "../../graphql";

export class MeView extends React.PureComponent {
  render() {
    return (
      <Query<MeQuery> query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }
          if (!data) {
            return <div>data is undefined</div>;
          }

          if (!data.me) {
            return <div>received no user</div>;
          }

          return <p>{data.me.email}</p>;
        }}
      </Query>
    );
  }
}
