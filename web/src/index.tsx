import ApolloClient from "apollo-boost";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import registerServiceWorker from "./registerServiceWorker";

import { ApolloProvider } from "react-apollo";
import { Routes } from "./Routes";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});

const GlobalStyle = createGlobalStyle`
  * {    
    box-sizing: border-box; 
  }
  body {
    background-color: rgb(255, 254, 252);
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  button, input, select, textarea {
    color: inherit;
    font: inherit;
    margin: 0;
  }
  *, *:focus {
    outline: 0;
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
    <GlobalStyle />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
