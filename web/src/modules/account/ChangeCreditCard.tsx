import * as React from "react";
import StripeCheckout from "react-stripe-checkout";

import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import {
  ChangeCreditCardMutation,
  ChangeCreditCardMutationVariables
} from "../../schemaTypes";

const changeCreditCardMutation = gql`
  mutation ChangeCreditCardMutation($source: String!) {
    changeCreditCard(source: $source) {
      id
      email
      type
    }
  }
`;

export class ChangeCreditCard extends React.PureComponent {
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
      <Mutation<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>
        mutation={changeCreditCardMutation}
      >
        {mutate => (
          <StripeCheckout
            token={async token => {
              const response = await mutate({
                variables: { source: token.id }
              });
              console.log(token);
              console.log(response);
            }}
            // stripeKey="pk_test_DfdUj9U4CiFdIflvg3X3rjRZ"
            stripeKey={process.env.REACT_APP_STRIP_PUBLISHABLE!}
            // panelLabel="Update Credit Card"
          />
        )}
      </Mutation>
    );
  }
}
