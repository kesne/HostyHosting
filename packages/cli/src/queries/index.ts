import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
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
   __typename?: 'APIKey',
  id: Scalars['Int'],
  privateKey?: Maybe<Scalars['String']>,
  description: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Application = {
   __typename?: 'Application',
  id: Scalars['Int'],
  name: Scalars['String'],
  description: Scalars['String'],
  createdBy?: Maybe<User>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  organization: Organization,
  components: Array<Component>,
  component: Component,
  environments: Array<Environment>,
};


export type ApplicationComponentArgs = {
  id: Scalars['Int']
};

export type ApplicationInput = {
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type ApplicationMutations = {
   __typename?: 'ApplicationMutations',
  delete: Application,
  update: Application,
  createComponent: Component,
  updateComponent: Component,
  addSecret: Secret,
  editSecret: Secret,
  deleteSecret: Secret,
  deleteComponent: Component,
};


export type ApplicationMutationsUpdateArgs = {
  application: ApplicationInput
};


export type ApplicationMutationsCreateComponentArgs = {
  component: ComponentInput
};


export type ApplicationMutationsUpdateComponentArgs = {
  component: ComponentInput,
  id: Scalars['Int']
};


export type ApplicationMutationsAddSecretArgs = {
  value: Scalars['String'],
  key: Scalars['String'],
  component: Scalars['Int']
};


export type ApplicationMutationsEditSecretArgs = {
  value: Scalars['String'],
  key: Scalars['String'],
  id: Scalars['Int'],
  component: Scalars['Int']
};


export type ApplicationMutationsDeleteSecretArgs = {
  id: Scalars['Int'],
  component: Scalars['Int']
};


export type ApplicationMutationsDeleteComponentArgs = {
  id: Scalars['Int']
};

export type Component = {
   __typename?: 'Component',
  id: Scalars['Int'],
  name: Scalars['String'],
  deploymentStrategy: DeploymentStrategy,
  image: Scalars['String'],
  secrets: Array<Secret>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  containerGroup: ContainerGroup,
  monthlyPrice: Scalars['Int'],
};

export type ComponentInput = {
  image?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  deploymentStrategy?: Maybe<DeploymentStrategy>,
  size?: Maybe<ContainerSize>,
  containerCount?: Maybe<Scalars['Int']>,
  environmentID?: Maybe<Scalars['Int']>,
};

export type Container = {
   __typename?: 'Container',
  id: Scalars['Int'],
  status: Scalars['String'],
};

export type ContainerGroup = {
   __typename?: 'ContainerGroup',
  id: Scalars['Int'],
  size: ContainerSize,
  containerCount: Scalars['Float'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  environment: Environment,
  component: Component,
  containers: Array<Container>,
};

export type ContainerGroupInput = {
  label: Scalars['String'],
  deploymentID: Scalars['Int'],
  size: ContainerSize,
  number: Scalars['Int'],
};

export enum ContainerSize {
  S1x1 = 'S1x1',
  S2x2 = 'S2x2',
  S4x4 = 'S4x4',
  S8x8 = 'S8x8',
  S16x16 = 'S16x16'
}


export enum DeploymentStrategy {
  Replace = 'REPLACE',
  Recreate = 'RECREATE'
}

export type Environment = {
   __typename?: 'Environment',
  id: Scalars['Int'],
  name: Scalars['String'],
  organization: Organization,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createAPIKeyRequest: Scalars['String'],
  grantAPIKey: Result,
  createAPIKey: ApiKey,
  deleteAPIKey: Result,
  application: ApplicationMutations,
  organization: OrganizationMutations,
  exchangeTOTP: Result,
  enableTotp: Result,
  disableTotp: Result,
  signUp: Result,
  signIn: SignInResult,
  gitHubSignIn: SignInResult,
  updateAccount: User,
  forgotPassword: Result,
  resetPassword: Result,
  signOut: Result,
};


export type MutationGrantApiKeyArgs = {
  uuid: Scalars['String']
};


export type MutationCreateApiKeyArgs = {
  description: Scalars['String']
};


export type MutationDeleteApiKeyArgs = {
  id: Scalars['Int']
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
  name: Scalars['String'],
  username: Scalars['String']
};


export type MutationSignInArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationGitHubSignInArgs = {
  code: Scalars['String']
};


export type MutationUpdateAccountArgs = {
  email?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  username?: Maybe<Scalars['String']>
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'],
  uuid: Scalars['String']
};

export type Network = {
   __typename?: 'Network',
  id: Scalars['Int'],
  name: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Notification = {
   __typename?: 'Notification',
  id: Scalars['Int'],
  title: Scalars['String'],
  body: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Organization = {
   __typename?: 'Organization',
  id: Scalars['Int'],
  isPersonal: Scalars['Boolean'],
  username: Scalars['String'],
  name: Scalars['String'],
  maxComputeUnits: Scalars['Float'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  applications: Array<Application>,
  environments: Array<Environment>,
};

export type OrganizationMutations = {
   __typename?: 'OrganizationMutations',
  changeUsername: Organization,
  createEnvironment: Environment,
  createApplication: Application,
};


export type OrganizationMutationsChangeUsernameArgs = {
  username: Scalars['String']
};


export type OrganizationMutationsCreateEnvironmentArgs = {
  name: Scalars['String']
};


export type OrganizationMutationsCreateApplicationArgs = {
  application: ApplicationInput
};

export type Query = {
   __typename?: 'Query',
  getAPIKeyFromRequest?: Maybe<Scalars['String']>,
  application: Application,
  estimateMonthlyPrice: Scalars['Int'],
  notifications: Array<Notification>,
  organization: Organization,
  me: User,
};


export type QueryGetApiKeyFromRequestArgs = {
  uuid: Scalars['String']
};


export type QueryApplicationArgs = {
  id: Scalars['Int']
};


export type QueryEstimateMonthlyPriceArgs = {
  count: Scalars['Int'],
  size: ContainerSize
};


export type QueryOrganizationArgs = {
  id?: Maybe<Scalars['Int']>
};

/** Provides a boolean to determine if the action was successful or not. */
export type Result = {
   __typename?: 'Result',
  ok: Scalars['Boolean'],
};

export type Secret = {
   __typename?: 'Secret',
  id: Scalars['Int'],
  key: Scalars['String'],
  value: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
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
   __typename?: 'SignInResult',
  ok: Scalars['Boolean'],
  requiresTOTP: Scalars['Boolean'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['Int'],
  githubID?: Maybe<Scalars['Int']>,
  name: Scalars['String'],
  username: Scalars['String'],
  email: Scalars['String'],
  isPasswordless: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  hasTOTP: Scalars['Boolean'],
  personalOrganization: Organization,
  apiKeys: Array<ApiKey>,
  onboardTOTP: Scalars['String'],
  organizations: Array<Organization>,
};

export type CreateApiKeyRequestMutationVariables = {};


export type CreateApiKeyRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createAPIKeyRequest'>
);

export type GetApiKeyFromRequestQueryVariables = {
  uuid: Scalars['String']
};


export type GetApiKeyFromRequestQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getAPIKeyFromRequest'>
);


export const CreateApiKeyRequestDocument = gql`
    mutation CreateAPIKeyRequest {
  createAPIKeyRequest
}
    `;
export type CreateApiKeyRequestMutationFn = ApolloReactCommon.MutationFunction<CreateApiKeyRequestMutation, CreateApiKeyRequestMutationVariables>;

/**
 * __useCreateApiKeyRequestMutation__
 *
 * To run a mutation, you first call `useCreateApiKeyRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApiKeyRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApiKeyRequestMutation, { data, loading, error }] = useCreateApiKeyRequestMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateApiKeyRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateApiKeyRequestMutation, CreateApiKeyRequestMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateApiKeyRequestMutation, CreateApiKeyRequestMutationVariables>(CreateApiKeyRequestDocument, baseOptions);
      }
export type CreateApiKeyRequestMutationHookResult = ReturnType<typeof useCreateApiKeyRequestMutation>;
export type CreateApiKeyRequestMutationResult = ApolloReactCommon.MutationResult<CreateApiKeyRequestMutation>;
export type CreateApiKeyRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateApiKeyRequestMutation, CreateApiKeyRequestMutationVariables>;
export const GetApiKeyFromRequestDocument = gql`
    query GetAPIKeyFromRequest($uuid: String!) {
  getAPIKeyFromRequest(uuid: $uuid)
}
    `;

/**
 * __useGetApiKeyFromRequestQuery__
 *
 * To run a query within a React component, call `useGetApiKeyFromRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApiKeyFromRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApiKeyFromRequestQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetApiKeyFromRequestQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetApiKeyFromRequestQuery, GetApiKeyFromRequestQueryVariables>) {
        return ApolloReactHooks.useQuery<GetApiKeyFromRequestQuery, GetApiKeyFromRequestQueryVariables>(GetApiKeyFromRequestDocument, baseOptions);
      }
export function useGetApiKeyFromRequestLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetApiKeyFromRequestQuery, GetApiKeyFromRequestQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetApiKeyFromRequestQuery, GetApiKeyFromRequestQueryVariables>(GetApiKeyFromRequestDocument, baseOptions);
        }
export type GetApiKeyFromRequestQueryHookResult = ReturnType<typeof useGetApiKeyFromRequestQuery>;
export type GetApiKeyFromRequestLazyQueryHookResult = ReturnType<typeof useGetApiKeyFromRequestLazyQuery>;
export type GetApiKeyFromRequestQueryResult = ApolloReactCommon.QueryResult<GetApiKeyFromRequestQuery, GetApiKeyFromRequestQueryVariables>;