export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type ApiKey = {
  id: Scalars['Int'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Application = {
  id: Scalars['Int'],
  name: Scalars['String'],
  description: Scalars['String'],
  createdBy?: Maybe<User>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  organization: Organization,
  containerGroups: Array<ContainerGroup>,
  deployments: Array<Deployment>,
  secrets: Array<Secret>,
};

export type ApplicationMutations = {
  delete: Application,
  update: Application,
  createDeployment: Deployment,
  updateDeployment: Deployment,
  deleteDeployment: Deployment,
  createContainerGroup: ContainerGroup,
  updateContainerGroup: ContainerGroup,
  deleteContainerGroup: ContainerGroup,
};


export type ApplicationMutationsUpdateArgs = {
  secret?: Maybe<SecretInput>,
  description?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>
};


export type ApplicationMutationsCreateDeploymentArgs = {
  strategy: DeploymentStrategy,
  label: Scalars['String'],
  image: Scalars['String']
};


export type ApplicationMutationsUpdateDeploymentArgs = {
  image: Scalars['String'],
  id: Scalars['Int']
};


export type ApplicationMutationsDeleteDeploymentArgs = {
  id: Scalars['Int']
};


export type ApplicationMutationsCreateContainerGroupArgs = {
  number: Scalars['Int'],
  size: Scalars['Int'],
  deployment: Scalars['Int'],
  label: Scalars['String']
};


export type ApplicationMutationsUpdateContainerGroupArgs = {
  number?: Maybe<Scalars['Int']>,
  label?: Maybe<Scalars['String']>,
  id: Scalars['Int']
};


export type ApplicationMutationsDeleteContainerGroupArgs = {
  id: Scalars['Int']
};

export type Container = {
  id: Scalars['Int'],
  status: Scalars['String'],
};

export type ContainerGroup = {
  id: Scalars['Int'],
  label: Scalars['String'],
  size: ContainerSize,
  containerCount: Scalars['Float'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  deployment: Deployment,
  containers: Array<Container>,
};

export enum ContainerSize {
  S1x1 = 'S1x1',
  S2x2 = 'S2x2',
  S4x4 = 'S4x4',
  S8x8 = 'S8x8',
  S16x16 = 'S16x16'
}


export type Deployment = {
  id: Scalars['Int'],
  label: Scalars['String'],
  strategy: DeploymentStrategy,
  image: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  containerGroups: Array<ContainerGroup>,
};

export enum DeploymentStrategy {
  Replace = 'REPLACE',
  Recreate = 'RECREATE'
}

export type Mutation = {
  createAPIKeyRequest: Scalars['String'],
  grantAPIKey: Result,
  application: ApplicationMutations,
  organization: OrganizationMutations,
  exchangeTOTP: Result,
  enableTotp: Result,
  disableTotp: Result,
  signUp: Result,
  signIn: SignInResult,
  updateAccount: User,
  forgotPassword: Result,
  resetPassword: Result,
};


export type MutationGrantApiKeyArgs = {
  uuid: Scalars['String']
};


export type MutationApplicationArgs = {
  id: Scalars['Int']
};


export type MutationOrganizationArgs = {
  id?: Maybe<Scalars['Int']>
};


export type MutationExchangeTotpArgs = {
  token: Scalars['String']
};


export type MutationEnableTotpArgs = {
  token: Scalars['String'],
  secret: Scalars['String']
};


export type MutationDisableTotpArgs = {
  password: Scalars['String']
};


export type MutationSignUpArgs = {
  password: Scalars['String'],
  email: Scalars['String'],
  name: Scalars['String']
};


export type MutationSignInArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationUpdateAccountArgs = {
  email?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'],
  uuid: Scalars['String']
};

export type Organization = {
  id: Scalars['Int'],
  isPersonal: Scalars['Boolean'],
  name: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  applications: Array<Application>,
};

export type OrganizationMutations = {
  createApplication: Application,
};


export type OrganizationMutationsCreateApplicationArgs = {
  description?: Maybe<Scalars['String']>,
  name: Scalars['String']
};

export type Query = {
  getAPIKeyFromRequest?: Maybe<Scalars['String']>,
  application: Application,
  organization: Organization,
  me: User,
};


export type QueryGetApiKeyFromRequestArgs = {
  uuid: Scalars['String']
};


export type QueryApplicationArgs = {
  id: Scalars['Int']
};


export type QueryOrganizationArgs = {
  id?: Maybe<Scalars['Int']>
};

/** Provides a boolean to determine if the action was successful or not. */
export type Result = {
  ok: Scalars['Boolean'],
};

export type Secret = {
  key: Scalars['String'],
  value: Scalars['String'],
};

export type SecretInput = {
  key: Scalars['String'],
  value: Scalars['String'],
};

/** 
 * A special type of result used just for SignIns. Provides a boolean for if the
 * user requires a TOTP exchange before being fully logged in.
 */
export type SignInResult = {
  ok: Scalars['Boolean'],
  requiresTOTP: Scalars['Boolean'],
};

export type User = {
  id: Scalars['Int'],
  name: Scalars['String'],
  email: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  hasTOTP: Scalars['Boolean'],
  personalOrganization: Organization,
  apiKeys: Array<ApiKey>,
  onboardTOTP: Scalars['String'],
  organizations: Array<Organization>,
};

export type CreateApiKeyRequestMutationVariables = {};


export type CreateApiKeyRequestMutation = Pick<Mutation, 'createAPIKeyRequest'>;

export type GetApiKeyFromRequestQueryVariables = {
  uuid: Scalars['String']
};


export type GetApiKeyFromRequestQuery = Pick<Query, 'getAPIKeyFromRequest'>;

import gql from 'graphql-tag';

export const CreateApiKeyRequest = gql`
    mutation CreateAPIKeyRequest {
  createAPIKeyRequest
}
    `;
export const GetApiKeyFromRequest = gql`
    query GetAPIKeyFromRequest($uuid: String!) {
  getAPIKeyFromRequest(uuid: $uuid)
}
    `;