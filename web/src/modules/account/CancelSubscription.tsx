import * as React from "react";
import { Mutation } from "react-apollo";
import { CancelSubscriptionMutation } from "../../schemaTypes";

import { gql } from "apollo-boost";
import { userFragment } from "../../graphql/fragments/userFragment";

const cancelSubscriptionMutation = gql`
  mutation CancelSubscriptionMutation {
    cancelSubscription {
      ...UserInfo
    }
  }
  ${userFragment}
`;

export class CancelSubscription extends React.PureComponent {
  render() {
    return (
      <Mutation<CancelSubscriptionMutation>
        mutation={cancelSubscriptionMutation}
      >
        {mutate => <button onClick={mutate as any}>Cancel Subscription</button>}
      </Mutation>
    );
  }
}
