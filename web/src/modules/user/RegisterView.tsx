import * as React from "react";
import styled from "styled-components";

import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { RegisterMutation, RegisterMutationVariables } from "../../schemaTypes";
import { FormWrapper } from "../../ui/FormWrapper";
import { Input } from "../../ui/Input";
import { RedButton, RedButtonText } from "../../ui/RedButton";

const H1 = styled.h1`
  font-size: 62px;
  font-weight: 700;
  margin-top: 20vh;
  margin-bottom: 24px;
  text-align: center;
  line-height: 1.1;
`;

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

export class RegisterView extends React.PureComponent<RouteComponentProps<{}>> {
  state = {
    email: "",
    password: ""
  };

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Mutation<RegisterMutation, RegisterMutationVariables>
        mutation={registerMutation}
      >
        {mutate => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <H1>Register</H1>
            <FormWrapper>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={this.handleChange}
              />

              <Input
                type="password"
                name="password"
                placeholder="Enter your password... "
                value={password}
                onChange={this.handleChange}
              />
              <RedButton
                onClick={async () => {
                  const response = await mutate({
                    // variables: {
                    //   email,
                    //   password
                    // }
                    variables: this.state
                  });
                  console.log(response);
                  this.props.history.push("/login");
                }}
              >
                <RedButtonText>Continue</RedButtonText>
              </RedButton>
            </FormWrapper>
          </div>
        )}
      </Mutation>
    );
  }
}
