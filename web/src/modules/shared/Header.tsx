import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { meQuery } from "../../graphql";
import { MeQuery } from "../../schemaTypes";

const NavWrapper = styled("div")`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  /* transform: translateX(256px) translateZ(0px); */
  transition: transform 200ms ease 0s;
  flex: 1;
`;

const LinkStyled = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const LinkText = styled("div")`
  display: inherit;
  align-items: center;
  width: auto;
  user-select: none;
  transition-property: background, opacity;
  transition-duration: 100ms;
  transition-timing-function: ease-out;
  padding: 4px 10px;
  border-radius: 3px;
  flex-shrink: 0;
  margin-left: 4px;
  margin-right: 4px;
  font-size: 15px;
  font-weight: 500;
`;

const Nav = styled("nav")`
  font-size: 15px;
  position: fixed;
  top: 0px;
  width: 100vw;
  background: rgb(255, 254, 252);
  height: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

const NavChild = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
  width: 976px;
  max-width: 100vw;
  position: relative;
  overflow: hidden;
`;

export class Header extends React.PureComponent {
  render() {
    return (
      // <div
      //   style={{
      //     height: 50,
      //     width: "100%",
      //     backgroundColor: "#fafafa",
      //     display: "flex",
      //     justifyContent: "space-around",
      //     padding: 10
      //   }}
      // >
      //   <div style={{ flex: 2, textAlign: "center" }}>
      //     <Link to="/">
      //       <h2>Stripe Example</h2>
      //     </Link>
      //   </div>
      //    <div
      //     style={{
      //       flex: 1,
      //       display: "flex",
      //       flexDirection: "row",
      //       alignItems: "center",
      //       justifyContent: "space-around"
      //     }}
      //   >
      <Nav>
        <NavChild>
          <div style={{ flexShrink: 0 }}>
            <Link to="/">
              <h2>Stripe Example</h2>
            </Link>
          </div>
          <Query<MeQuery> /*fetchPolicy="network-only"*/ query={meQuery}>
            {({ data, loading }) => {
              if (loading || !data) {
                return null;
              }

              if (!data.me) {
                return (
                  <NavWrapper>
                    <LinkStyled to="/login">
                      <LinkText>Log in</LinkText>
                    </LinkStyled>

                    <LinkStyled to="/register">
                      <LinkText>Register</LinkText>
                    </LinkStyled>
                  </NavWrapper>
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
        </NavChild>
      </Nav>
      //   </div>
      // </div>
    );
  }
}
