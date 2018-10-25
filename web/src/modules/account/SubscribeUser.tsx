import * as React from "react";
import StripeCheckout from "react-stripe-checkout";

import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import {
  CreateSubscriptionMutation,
  CreateSubscriptionMutationVariables
} from "../../schemaTypes";

import { userFragment } from "../../graphql/fragments/userFragment";

const createSubscriptionMutation = gql`
  mutation CreateSubscriptionMutation($source: String!, $ccLast4: String!) {
    createSubscription(source: $source, ccLast4: $ccLast4) {
      # id
      # email
      # type
      ...UserInfo
    }
  }
  ${userFragment}
`;

export class SubscribeUser extends React.PureComponent {
  //   onToken = token => {
  //     fetch("/save-stripe-token", {
  //       method: "POST",
  //       body: JSON.stringify(token)
  //     }).then(response => {
  //       response.json().then(data => {
  //         alert(`We are in business, ${data.email}`);
  //       });
  //     });
  //   };

  // render() {
  //   return (
  //     <StripeCheckout
  //       token={token => {
  //         console.log(token);
  //       }}
  //       // stripeKey="pk_test_DfdUj9U4CiFdIflvg3X3rjRZ"
  //       stripeKey={process.env.REACT_APP_STRIP_PUBLISHABLE!}
  //     />
  //   );
  // }

  render() {
    return (
      <Mutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>
        mutation={createSubscriptionMutation}
      >
        {mutate => (
          <StripeCheckout
            token={async token => {
              const response = await mutate({
                variables: {
                  source: token.id,
                  ccLast4: token.card.last4
                }
              });
              console.log(token);
              console.log(response);
            }}
            // stripeKey="pk_test_DfdUj9U4CiFdIflvg3X3rjRZ"
            stripeKey={process.env.REACT_APP_STRIP_PUBLISHABLE!}
          />
        )}
      </Mutation>
    );
  }
}
