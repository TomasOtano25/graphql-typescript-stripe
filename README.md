# graphql-typescript-stripe

    0. Architecture
    1. Server
    2. Fronted
    3. Stripe checkout and sign user up for subcription
    4. How to handle free trials
    5. Nav bar
    6. Change credit car
    7. Cancel or resubscribe
    8. Styled Components

# INIT

typeorm init --name server --database postgres

# UPDATE

yarn upgrade-interactive --latest

# Create Database

sudo su postgres
createdb stripe-example

# Repando el codegen:generate

ls node_modules/apollo/node_modules/graphql
vim node_modules/apollo/node_modules/graphql/package.json
rm -rf node_modules/apollo/node_modules/graphql

# Link

[https://github.com/benawad/fullstack-graphql-airbnb-clone/blob/master/packages/server/tsconfig.json]()
[https://www.apollographql.com/docs/apollo-server/essentials/server.html#integrations]()
[https://github.com/benawad/fullstack-graphql-airbnb-clone/blob/master/tslint.json]()
[https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost]()[https://github.com/benawad/fullstack-graphql-airbnb-clone/blob/master/packages/controller/package.json]()

# react-stripe-checkout-components

[https://github.com/azmenak/react-stripe-checkout]()

# stripe-node

[https://github.com/stripe/stripe-node]()
