import * as React from "react";
import styled from "styled-components";

import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { LoginMutation, LoginMutationVariables } from "../../schemaTypes";

import { meQuery } from "../../graphql";

import { userFragment } from "../../graphql/fragments/userFragment";
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

const Space = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  width: 100%;
  height: 25px;
  flex: 0 0 auto;
`;

// const Line = styled.div`
//   width: 100%;
//   height: 1px;
//   visibility: visible;
//   border-bottom: 1px solid rgba(55, 53, 47, 0.09);
// `;

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      # id
      # email
      # type
      ...UserInfo
    }
  }
  ${userFragment}
`;

export class LoginView extends React.PureComponent<RouteComponentProps<{}>> {
  state = {
    email: "",
    password: "",
    showClearButton: false
  };

  handleChange = async (e: any) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });

    if (name === "email" && value !== "") {
      this.setState({ showClearButton: true });
    }
    if (name === "email" && value === "") {
      this.setState({ showClearButton: false });
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <Mutation<LoginMutation, LoginMutationVariables>
        update={(cache, { data }) => {
          if (!data || !data.login) {
            return;
          }

          cache.writeQuery({
            query: meQuery,
            data: { me: data.login }
          });
        }}
        mutation={loginMutation}
      >
        {(mutate, { client }) => (
          // <div className="container">
          //   <div className="row justify-content-center">
          //     <div className="col-11 col-sm-6 col-lg-5 col-xl-4">
          //        <div
          //       style={{
          //         alignItems: "center",
          //         display: "flex",
          //         flexDirection: "column",
          //         justifyContent: "center"
          //       }}
          //       >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <H1>Log in</H1>
            <FormWrapper>
              <div style={{ width: "100%" }}>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={this.handleChange}
                  showClearButton={this.state.showClearButton}
                  label="Email"
                  // autoComplete="off"
                />
                <Space />
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password..."
                  value={password}
                  onChange={this.handleChange}
                  label="Password"
                />
                <RedButton
                  onClick={async () => {
                    // optional reset cache
                    await client.resetStore();
                    const response = await mutate({
                      // variables: {
                      //   email,
                      //   password
                      // }
                      variables: this.state
                    });
                    console.log(response);
                    this.props.history.push("/account");
                  }}
                >
                  <RedButtonText>Continue</RedButtonText>
                </RedButton>
              </div>
            </FormWrapper>
          </div>
          //   </div>
          // </div>
        )}
      </Mutation>
    );
  }
}
