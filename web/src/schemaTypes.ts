/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  id: string;
  email: string;
  type: string;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeCreditCardMutation
// ====================================================

export interface ChangeCreditCardMutation_changeCreditCard {
  id: string;
  email: string;
  type: string;
}

export interface ChangeCreditCardMutation {
  changeCreditCard: ChangeCreditCardMutation_changeCreditCard | null;
}

export interface ChangeCreditCardMutationVariables {
  source: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSubscriptionMutation
// ====================================================

export interface CreateSubscriptionMutation_createSubscription {
  id: string;
  email: string;
  type: string;
}

export interface CreateSubscriptionMutation {
  createSubscription: CreateSubscriptionMutation_createSubscription | null;
}

export interface CreateSubscriptionMutationVariables {
  source: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  id: string;
  email: string;
  type: string;
}

export interface LoginMutation {
  login: LoginMutation_login | null;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation {
  register: boolean;
}

export interface RegisterMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================