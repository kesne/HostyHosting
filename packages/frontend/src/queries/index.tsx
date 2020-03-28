import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
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
  containerGroups: Array<ContainerGroup>,
  deployments: Array<Deployment>,
  secrets: Array<Secret>,
};

export type ApplicationMutations = {
   __typename?: 'ApplicationMutations',
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
   __typename?: 'Container',
  id: Scalars['Int'],
  status: Scalars['String'],
};

export type ContainerGroup = {
   __typename?: 'ContainerGroup',
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
   __typename?: 'Deployment',
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
   __typename?: 'Mutation',
  createAPIKeyRequest: Scalars['String'],
  grantAPIKey: Result,
  createAPIKey: Scalars['String'],
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
  name: Scalars['String']
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
   __typename?: 'Organization',
  id: Scalars['Int'],
  isPersonal: Scalars['Boolean'],
  name: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  applications: Array<Application>,
};

export type OrganizationMutations = {
   __typename?: 'OrganizationMutations',
  createApplication: Application,
};


export type OrganizationMutationsCreateApplicationArgs = {
  description?: Maybe<Scalars['String']>,
  name: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
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
   __typename?: 'Result',
  ok: Scalars['Boolean'],
};

export type Secret = {
   __typename?: 'Secret',
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
   __typename?: 'SignInResult',
  ok: Scalars['Boolean'],
  requiresTOTP: Scalars['Boolean'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['Int'],
  githubID?: Maybe<Scalars['Int']>,
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

export type ApplicationQueryVariables = {
  id: Scalars['Int']
};


export type ApplicationQuery = (
  { __typename?: 'Query' }
  & { application: (
    { __typename?: 'Application' }
    & ApplicationFragmentFragment
  ) }
);

export type ApplicationContainerGroupsQueryVariables = {
  id: Scalars['Int']
};


export type ApplicationContainerGroupsQuery = (
  { __typename?: 'Query' }
  & { application: (
    { __typename?: 'Application' }
    & Pick<Application, 'id'>
    & { containerGroups: Array<(
      { __typename?: 'ContainerGroup' }
      & Pick<ContainerGroup, 'id' | 'label' | 'size' | 'containerCount'>
      & { containers: Array<(
        { __typename?: 'Container' }
        & Pick<Container, 'id' | 'status'>
      )>, deployment: (
        { __typename?: 'Deployment' }
        & Pick<Deployment, 'id' | 'image'>
      ) }
    )> }
  ) }
);

export type ApplicationDeploymentsQueryVariables = {
  id: Scalars['Int']
};


export type ApplicationDeploymentsQuery = (
  { __typename?: 'Query' }
  & { application: (
    { __typename?: 'Application' }
    & Pick<Application, 'id'>
    & { deployments: Array<(
      { __typename?: 'Deployment' }
      & Pick<Deployment, 'id' | 'image'>
    )> }
  ) }
);

export type ApplicationFragmentFragment = (
  { __typename?: 'Application' }
  & Pick<Application, 'id' | 'name' | 'description' | 'createdAt' | 'updatedAt'>
  & { secrets: Array<(
    { __typename?: 'Secret' }
    & Pick<Secret, 'key' | 'value'>
  )>, createdBy: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);

export type ApplicationsQueryVariables = {
  org?: Maybe<Scalars['Int']>
};


export type ApplicationsQuery = (
  { __typename?: 'Query' }
  & { organization: (
    { __typename?: 'Organization' }
    & Pick<Organization, 'id'>
    & { applications: Array<(
      { __typename?: 'Application' }
      & Pick<Application, 'id' | 'name' | 'description'>
    )> }
  ) }
);

export type CreateApiKeyMutationVariables = {
  description: Scalars['String']
};


export type CreateApiKeyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createAPIKey'>
);

export type CreateApplicationMutationVariables = {
  org?: Maybe<Scalars['Int']>,
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>
};


export type CreateApplicationMutation = (
  { __typename?: 'Mutation' }
  & { organization: (
    { __typename?: 'OrganizationMutations' }
    & { createApplication: (
      { __typename?: 'Application' }
      & Pick<Application, 'id'>
    ) }
  ) }
);

export type CreateContainerGroupMutationVariables = {
  applicationID: Scalars['Int'],
  label: Scalars['String'],
  deployment: Scalars['Int'],
  size: Scalars['Int'],
  number: Scalars['Int']
};


export type CreateContainerGroupMutation = (
  { __typename?: 'Mutation' }
  & { application: (
    { __typename?: 'ApplicationMutations' }
    & { createContainerGroup: (
      { __typename?: 'ContainerGroup' }
      & Pick<ContainerGroup, 'id' | 'label' | 'size'>
      & { containers: Array<(
        { __typename?: 'Container' }
        & Pick<Container, 'id' | 'status'>
      )>, deployment: (
        { __typename?: 'Deployment' }
        & Pick<Deployment, 'id' | 'image'>
      ) }
    ) }
  ) }
);

export type CreateDeploymentMutationVariables = {
  applicationID: Scalars['Int'],
  image: Scalars['String'],
  label: Scalars['String'],
  strategy: DeploymentStrategy
};


export type CreateDeploymentMutation = (
  { __typename?: 'Mutation' }
  & { application: (
    { __typename?: 'ApplicationMutations' }
    & { createDeployment: (
      { __typename?: 'Deployment' }
      & Pick<Deployment, 'id' | 'image'>
    ) }
  ) }
);

export type DeleteApiKeyMutationVariables = {
  id: Scalars['Int']
};


export type DeleteApiKeyMutation = (
  { __typename?: 'Mutation' }
  & { deleteAPIKey: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type DeleteApplicationMutationVariables = {
  id: Scalars['Int']
};


export type DeleteApplicationMutation = (
  { __typename?: 'Mutation' }
  & { application: (
    { __typename?: 'ApplicationMutations' }
    & { delete: (
      { __typename?: 'Application' }
      & Pick<Application, 'id'>
    ) }
  ) }
);

export type DeleteContainerGroupMutationVariables = {
  applicationID: Scalars['Int'],
  id: Scalars['Int']
};


export type DeleteContainerGroupMutation = (
  { __typename?: 'Mutation' }
  & { application: (
    { __typename?: 'ApplicationMutations' }
    & { deleteContainerGroup: (
      { __typename?: 'ContainerGroup' }
      & Pick<ContainerGroup, 'id'>
    ) }
  ) }
);

export type DeleteDeploymentMutationVariables = {
  applicationID: Scalars['Int'],
  id: Scalars['Int']
};


export type DeleteDeploymentMutation = (
  { __typename?: 'Mutation' }
  & { application: (
    { __typename?: 'ApplicationMutations' }
    & { deleteDeployment: (
      { __typename?: 'Deployment' }
      & Pick<Deployment, 'id'>
    ) }
  ) }
);

export type DisableTotpMutationVariables = {
  password: Scalars['String']
};


export type DisableTotpMutation = (
  { __typename?: 'Mutation' }
  & { disableTotp: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type EnableTotpMutationVariables = {
  secret: Scalars['String'],
  token: Scalars['String']
};


export type EnableTotpMutation = (
  { __typename?: 'Mutation' }
  & { enableTotp: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type ExchangeTotpMutationVariables = {
  token: Scalars['String']
};


export type ExchangeTotpMutation = (
  { __typename?: 'Mutation' }
  & { exchangeTOTP: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type ForgotPasswordMutationVariables = {
  email: Scalars['String']
};


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type GitHubSignInMutationVariables = {
  code: Scalars['String']
};


export type GitHubSignInMutation = (
  { __typename?: 'Mutation' }
  & { gitHubSignIn: (
    { __typename?: 'SignInResult' }
    & Pick<SignInResult, 'ok' | 'requiresTOTP'>
  ) }
);

export type GrantApiKeyMutationVariables = {
  uuid: Scalars['String']
};


export type GrantApiKeyMutation = (
  { __typename?: 'Mutation' }
  & { grantAPIKey: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & MeFragmentFragment
  ) }
);

export type MeFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'email' | 'hasTOTP'>
);

export type MyApiKeysQueryVariables = {};


export type MyApiKeysQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { apiKeys: Array<(
      { __typename?: 'APIKey' }
      & Pick<ApiKey, 'id' | 'description' | 'createdAt'>
    )> }
  ) }
);

export type MyOrganizationsQueryVariables = {};


export type MyOrganizationsQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { personalOrganization: (
      { __typename?: 'Organization' }
      & Pick<Organization, 'id'>
    ), organizations: Array<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'name'>
    )> }
  ) }
);

export type OnboardTotpQueryVariables = {};


export type OnboardTotpQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'onboardTOTP'>
  ) }
);

export type ResetPasswordMutationVariables = {
  uuid: Scalars['String'],
  password: Scalars['String']
};


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type SignInMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn: (
    { __typename?: 'SignInResult' }
    & Pick<SignInResult, 'ok' | 'requiresTOTP'>
  ) }
);

export type SignUpMutationVariables = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String']
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'Result' }
    & Pick<Result, 'ok'>
  ) }
);

export type UpdateAccountMutationVariables = {
  name: Scalars['String'],
  email: Scalars['String']
};


export type UpdateAccountMutation = (
  { __typename?: 'Mutation' }
  & { updateAccount: (
    { __typename?: 'User' }
    & MeFragmentFragment
  ) }
);

export type UpdateApplicationMutationVariables = {
  id: Scalars['Int'],
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  secret?: Maybe<SecretInput>
};


export type UpdateApplicationMutation = (
  { __typename?: 'Mutation' }
  & { application: (
    { __typename?: 'ApplicationMutations' }
    & { update: (
      { __typename?: 'Application' }
      & ApplicationFragmentFragment
    ) }
  ) }
);

export type UpdateContainerGroupMutationVariables = {
  applicationID: Scalars['Int'],
  id: Scalars['Int'],
  number: Scalars['Int']
};


export type UpdateContainerGroupMutation = (
  { __typename?: 'Mutation' }
  & { application: (
    { __typename?: 'ApplicationMutations' }
    & { updateContainerGroup: (
      { __typename?: 'ContainerGroup' }
      & Pick<ContainerGroup, 'id' | 'size' | 'containerCount'>
      & { containers: Array<(
        { __typename?: 'Container' }
        & Pick<Container, 'id' | 'status'>
      )> }
    ) }
  ) }
);

export const ApplicationFragmentFragmentDoc = gql`
    fragment ApplicationFragment on Application {
  id
  name
  description
  secrets {
    key
    value
  }
  createdBy {
    id
    name
  }
  createdAt
  updatedAt
}
    `;
export const MeFragmentFragmentDoc = gql`
    fragment MeFragment on User {
  id
  name
  email
  hasTOTP
}
    `;
export const ApplicationDocument = gql`
    query Application($id: Int!) {
  application(id: $id) {
    ...ApplicationFragment
  }
}
    ${ApplicationFragmentFragmentDoc}`;

/**
 * __useApplicationQuery__
 *
 * To run a query within a React component, call `useApplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useApplicationQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApplicationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApplicationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ApplicationQuery, ApplicationQueryVariables>) {
        return ApolloReactHooks.useQuery<ApplicationQuery, ApplicationQueryVariables>(ApplicationDocument, baseOptions);
      }
export function useApplicationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ApplicationQuery, ApplicationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ApplicationQuery, ApplicationQueryVariables>(ApplicationDocument, baseOptions);
        }
export type ApplicationQueryHookResult = ReturnType<typeof useApplicationQuery>;
export type ApplicationLazyQueryHookResult = ReturnType<typeof useApplicationLazyQuery>;
export type ApplicationQueryResult = ApolloReactCommon.QueryResult<ApplicationQuery, ApplicationQueryVariables>;
export const ApplicationContainerGroupsDocument = gql`
    query ApplicationContainerGroups($id: Int!) {
  application(id: $id) {
    id
    containerGroups {
      id
      label
      size
      containerCount
      containers {
        id
        status
      }
      deployment {
        id
        image
      }
    }
  }
}
    `;

/**
 * __useApplicationContainerGroupsQuery__
 *
 * To run a query within a React component, call `useApplicationContainerGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApplicationContainerGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApplicationContainerGroupsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApplicationContainerGroupsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ApplicationContainerGroupsQuery, ApplicationContainerGroupsQueryVariables>) {
        return ApolloReactHooks.useQuery<ApplicationContainerGroupsQuery, ApplicationContainerGroupsQueryVariables>(ApplicationContainerGroupsDocument, baseOptions);
      }
export function useApplicationContainerGroupsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ApplicationContainerGroupsQuery, ApplicationContainerGroupsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ApplicationContainerGroupsQuery, ApplicationContainerGroupsQueryVariables>(ApplicationContainerGroupsDocument, baseOptions);
        }
export type ApplicationContainerGroupsQueryHookResult = ReturnType<typeof useApplicationContainerGroupsQuery>;
export type ApplicationContainerGroupsLazyQueryHookResult = ReturnType<typeof useApplicationContainerGroupsLazyQuery>;
export type ApplicationContainerGroupsQueryResult = ApolloReactCommon.QueryResult<ApplicationContainerGroupsQuery, ApplicationContainerGroupsQueryVariables>;
export const ApplicationDeploymentsDocument = gql`
    query ApplicationDeployments($id: Int!) {
  application(id: $id) {
    id
    deployments {
      id
      image
    }
  }
}
    `;

/**
 * __useApplicationDeploymentsQuery__
 *
 * To run a query within a React component, call `useApplicationDeploymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApplicationDeploymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApplicationDeploymentsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApplicationDeploymentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ApplicationDeploymentsQuery, ApplicationDeploymentsQueryVariables>) {
        return ApolloReactHooks.useQuery<ApplicationDeploymentsQuery, ApplicationDeploymentsQueryVariables>(ApplicationDeploymentsDocument, baseOptions);
      }
export function useApplicationDeploymentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ApplicationDeploymentsQuery, ApplicationDeploymentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ApplicationDeploymentsQuery, ApplicationDeploymentsQueryVariables>(ApplicationDeploymentsDocument, baseOptions);
        }
export type ApplicationDeploymentsQueryHookResult = ReturnType<typeof useApplicationDeploymentsQuery>;
export type ApplicationDeploymentsLazyQueryHookResult = ReturnType<typeof useApplicationDeploymentsLazyQuery>;
export type ApplicationDeploymentsQueryResult = ApolloReactCommon.QueryResult<ApplicationDeploymentsQuery, ApplicationDeploymentsQueryVariables>;
export const ApplicationsDocument = gql`
    query Applications($org: Int) {
  organization(id: $org) {
    id
    applications {
      id
      name
      description
    }
  }
}
    `;

/**
 * __useApplicationsQuery__
 *
 * To run a query within a React component, call `useApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApplicationsQuery({
 *   variables: {
 *      org: // value for 'org'
 *   },
 * });
 */
export function useApplicationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ApplicationsQuery, ApplicationsQueryVariables>) {
        return ApolloReactHooks.useQuery<ApplicationsQuery, ApplicationsQueryVariables>(ApplicationsDocument, baseOptions);
      }
export function useApplicationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ApplicationsQuery, ApplicationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ApplicationsQuery, ApplicationsQueryVariables>(ApplicationsDocument, baseOptions);
        }
export type ApplicationsQueryHookResult = ReturnType<typeof useApplicationsQuery>;
export type ApplicationsLazyQueryHookResult = ReturnType<typeof useApplicationsLazyQuery>;
export type ApplicationsQueryResult = ApolloReactCommon.QueryResult<ApplicationsQuery, ApplicationsQueryVariables>;
export const CreateApiKeyDocument = gql`
    mutation CreateAPIKey($description: String!) {
  createAPIKey(description: $description)
}
    `;
export type CreateApiKeyMutationFn = ApolloReactCommon.MutationFunction<CreateApiKeyMutation, CreateApiKeyMutationVariables>;

/**
 * __useCreateApiKeyMutation__
 *
 * To run a mutation, you first call `useCreateApiKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApiKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApiKeyMutation, { data, loading, error }] = useCreateApiKeyMutation({
 *   variables: {
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateApiKeyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateApiKeyMutation, CreateApiKeyMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateApiKeyMutation, CreateApiKeyMutationVariables>(CreateApiKeyDocument, baseOptions);
      }
export type CreateApiKeyMutationHookResult = ReturnType<typeof useCreateApiKeyMutation>;
export type CreateApiKeyMutationResult = ApolloReactCommon.MutationResult<CreateApiKeyMutation>;
export type CreateApiKeyMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateApiKeyMutation, CreateApiKeyMutationVariables>;
export const CreateApplicationDocument = gql`
    mutation CreateApplication($org: Int, $name: String!, $description: String) {
  organization(id: $org) {
    createApplication(name: $name, description: $description) {
      id
    }
  }
}
    `;
export type CreateApplicationMutationFn = ApolloReactCommon.MutationFunction<CreateApplicationMutation, CreateApplicationMutationVariables>;

/**
 * __useCreateApplicationMutation__
 *
 * To run a mutation, you first call `useCreateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApplicationMutation, { data, loading, error }] = useCreateApplicationMutation({
 *   variables: {
 *      org: // value for 'org'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateApplicationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateApplicationMutation, CreateApplicationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateApplicationMutation, CreateApplicationMutationVariables>(CreateApplicationDocument, baseOptions);
      }
export type CreateApplicationMutationHookResult = ReturnType<typeof useCreateApplicationMutation>;
export type CreateApplicationMutationResult = ApolloReactCommon.MutationResult<CreateApplicationMutation>;
export type CreateApplicationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateApplicationMutation, CreateApplicationMutationVariables>;
export const CreateContainerGroupDocument = gql`
    mutation CreateContainerGroup($applicationID: Int!, $label: String!, $deployment: Int!, $size: Int!, $number: Int!) {
  application(id: $applicationID) {
    createContainerGroup(label: $label, deployment: $deployment, size: $size, number: $number) {
      id
      label
      size
      containers {
        id
        status
      }
      deployment {
        id
        image
      }
    }
  }
}
    `;
export type CreateContainerGroupMutationFn = ApolloReactCommon.MutationFunction<CreateContainerGroupMutation, CreateContainerGroupMutationVariables>;

/**
 * __useCreateContainerGroupMutation__
 *
 * To run a mutation, you first call `useCreateContainerGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContainerGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContainerGroupMutation, { data, loading, error }] = useCreateContainerGroupMutation({
 *   variables: {
 *      applicationID: // value for 'applicationID'
 *      label: // value for 'label'
 *      deployment: // value for 'deployment'
 *      size: // value for 'size'
 *      number: // value for 'number'
 *   },
 * });
 */
export function useCreateContainerGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateContainerGroupMutation, CreateContainerGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateContainerGroupMutation, CreateContainerGroupMutationVariables>(CreateContainerGroupDocument, baseOptions);
      }
export type CreateContainerGroupMutationHookResult = ReturnType<typeof useCreateContainerGroupMutation>;
export type CreateContainerGroupMutationResult = ApolloReactCommon.MutationResult<CreateContainerGroupMutation>;
export type CreateContainerGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateContainerGroupMutation, CreateContainerGroupMutationVariables>;
export const CreateDeploymentDocument = gql`
    mutation CreateDeployment($applicationID: Int!, $image: String!, $label: String!, $strategy: DeploymentStrategy!) {
  application(id: $applicationID) {
    createDeployment(image: $image, label: $label, strategy: $strategy) {
      id
      image
    }
  }
}
    `;
export type CreateDeploymentMutationFn = ApolloReactCommon.MutationFunction<CreateDeploymentMutation, CreateDeploymentMutationVariables>;

/**
 * __useCreateDeploymentMutation__
 *
 * To run a mutation, you first call `useCreateDeploymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeploymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeploymentMutation, { data, loading, error }] = useCreateDeploymentMutation({
 *   variables: {
 *      applicationID: // value for 'applicationID'
 *      image: // value for 'image'
 *      label: // value for 'label'
 *      strategy: // value for 'strategy'
 *   },
 * });
 */
export function useCreateDeploymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDeploymentMutation, CreateDeploymentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateDeploymentMutation, CreateDeploymentMutationVariables>(CreateDeploymentDocument, baseOptions);
      }
export type CreateDeploymentMutationHookResult = ReturnType<typeof useCreateDeploymentMutation>;
export type CreateDeploymentMutationResult = ApolloReactCommon.MutationResult<CreateDeploymentMutation>;
export type CreateDeploymentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDeploymentMutation, CreateDeploymentMutationVariables>;
export const DeleteApiKeyDocument = gql`
    mutation DeleteAPIKey($id: Int!) {
  deleteAPIKey(id: $id) {
    ok
  }
}
    `;
export type DeleteApiKeyMutationFn = ApolloReactCommon.MutationFunction<DeleteApiKeyMutation, DeleteApiKeyMutationVariables>;

/**
 * __useDeleteApiKeyMutation__
 *
 * To run a mutation, you first call `useDeleteApiKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteApiKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteApiKeyMutation, { data, loading, error }] = useDeleteApiKeyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteApiKeyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteApiKeyMutation, DeleteApiKeyMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteApiKeyMutation, DeleteApiKeyMutationVariables>(DeleteApiKeyDocument, baseOptions);
      }
export type DeleteApiKeyMutationHookResult = ReturnType<typeof useDeleteApiKeyMutation>;
export type DeleteApiKeyMutationResult = ApolloReactCommon.MutationResult<DeleteApiKeyMutation>;
export type DeleteApiKeyMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteApiKeyMutation, DeleteApiKeyMutationVariables>;
export const DeleteApplicationDocument = gql`
    mutation DeleteApplication($id: Int!) {
  application(id: $id) {
    delete {
      id
    }
  }
}
    `;
export type DeleteApplicationMutationFn = ApolloReactCommon.MutationFunction<DeleteApplicationMutation, DeleteApplicationMutationVariables>;

/**
 * __useDeleteApplicationMutation__
 *
 * To run a mutation, you first call `useDeleteApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteApplicationMutation, { data, loading, error }] = useDeleteApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteApplicationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteApplicationMutation, DeleteApplicationMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteApplicationMutation, DeleteApplicationMutationVariables>(DeleteApplicationDocument, baseOptions);
      }
export type DeleteApplicationMutationHookResult = ReturnType<typeof useDeleteApplicationMutation>;
export type DeleteApplicationMutationResult = ApolloReactCommon.MutationResult<DeleteApplicationMutation>;
export type DeleteApplicationMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteApplicationMutation, DeleteApplicationMutationVariables>;
export const DeleteContainerGroupDocument = gql`
    mutation DeleteContainerGroup($applicationID: Int!, $id: Int!) {
  application(id: $applicationID) {
    deleteContainerGroup(id: $id) {
      id
    }
  }
}
    `;
export type DeleteContainerGroupMutationFn = ApolloReactCommon.MutationFunction<DeleteContainerGroupMutation, DeleteContainerGroupMutationVariables>;

/**
 * __useDeleteContainerGroupMutation__
 *
 * To run a mutation, you first call `useDeleteContainerGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContainerGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContainerGroupMutation, { data, loading, error }] = useDeleteContainerGroupMutation({
 *   variables: {
 *      applicationID: // value for 'applicationID'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContainerGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteContainerGroupMutation, DeleteContainerGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteContainerGroupMutation, DeleteContainerGroupMutationVariables>(DeleteContainerGroupDocument, baseOptions);
      }
export type DeleteContainerGroupMutationHookResult = ReturnType<typeof useDeleteContainerGroupMutation>;
export type DeleteContainerGroupMutationResult = ApolloReactCommon.MutationResult<DeleteContainerGroupMutation>;
export type DeleteContainerGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteContainerGroupMutation, DeleteContainerGroupMutationVariables>;
export const DeleteDeploymentDocument = gql`
    mutation DeleteDeployment($applicationID: Int!, $id: Int!) {
  application(id: $applicationID) {
    deleteDeployment(id: $id) {
      id
    }
  }
}
    `;
export type DeleteDeploymentMutationFn = ApolloReactCommon.MutationFunction<DeleteDeploymentMutation, DeleteDeploymentMutationVariables>;

/**
 * __useDeleteDeploymentMutation__
 *
 * To run a mutation, you first call `useDeleteDeploymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDeploymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDeploymentMutation, { data, loading, error }] = useDeleteDeploymentMutation({
 *   variables: {
 *      applicationID: // value for 'applicationID'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDeploymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteDeploymentMutation, DeleteDeploymentMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteDeploymentMutation, DeleteDeploymentMutationVariables>(DeleteDeploymentDocument, baseOptions);
      }
export type DeleteDeploymentMutationHookResult = ReturnType<typeof useDeleteDeploymentMutation>;
export type DeleteDeploymentMutationResult = ApolloReactCommon.MutationResult<DeleteDeploymentMutation>;
export type DeleteDeploymentMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteDeploymentMutation, DeleteDeploymentMutationVariables>;
export const DisableTotpDocument = gql`
    mutation DisableTOTP($password: String!) {
  disableTotp(password: $password) {
    ok
  }
}
    `;
export type DisableTotpMutationFn = ApolloReactCommon.MutationFunction<DisableTotpMutation, DisableTotpMutationVariables>;

/**
 * __useDisableTotpMutation__
 *
 * To run a mutation, you first call `useDisableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableTotpMutation, { data, loading, error }] = useDisableTotpMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useDisableTotpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DisableTotpMutation, DisableTotpMutationVariables>) {
        return ApolloReactHooks.useMutation<DisableTotpMutation, DisableTotpMutationVariables>(DisableTotpDocument, baseOptions);
      }
export type DisableTotpMutationHookResult = ReturnType<typeof useDisableTotpMutation>;
export type DisableTotpMutationResult = ApolloReactCommon.MutationResult<DisableTotpMutation>;
export type DisableTotpMutationOptions = ApolloReactCommon.BaseMutationOptions<DisableTotpMutation, DisableTotpMutationVariables>;
export const EnableTotpDocument = gql`
    mutation EnableTotp($secret: String!, $token: String!) {
  enableTotp(secret: $secret, token: $token) {
    ok
  }
}
    `;
export type EnableTotpMutationFn = ApolloReactCommon.MutationFunction<EnableTotpMutation, EnableTotpMutationVariables>;

/**
 * __useEnableTotpMutation__
 *
 * To run a mutation, you first call `useEnableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableTotpMutation, { data, loading, error }] = useEnableTotpMutation({
 *   variables: {
 *      secret: // value for 'secret'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useEnableTotpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EnableTotpMutation, EnableTotpMutationVariables>) {
        return ApolloReactHooks.useMutation<EnableTotpMutation, EnableTotpMutationVariables>(EnableTotpDocument, baseOptions);
      }
export type EnableTotpMutationHookResult = ReturnType<typeof useEnableTotpMutation>;
export type EnableTotpMutationResult = ApolloReactCommon.MutationResult<EnableTotpMutation>;
export type EnableTotpMutationOptions = ApolloReactCommon.BaseMutationOptions<EnableTotpMutation, EnableTotpMutationVariables>;
export const ExchangeTotpDocument = gql`
    mutation ExchangeTOTP($token: String!) {
  exchangeTOTP(token: $token) {
    ok
  }
}
    `;
export type ExchangeTotpMutationFn = ApolloReactCommon.MutationFunction<ExchangeTotpMutation, ExchangeTotpMutationVariables>;

/**
 * __useExchangeTotpMutation__
 *
 * To run a mutation, you first call `useExchangeTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExchangeTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exchangeTotpMutation, { data, loading, error }] = useExchangeTotpMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useExchangeTotpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ExchangeTotpMutation, ExchangeTotpMutationVariables>) {
        return ApolloReactHooks.useMutation<ExchangeTotpMutation, ExchangeTotpMutationVariables>(ExchangeTotpDocument, baseOptions);
      }
export type ExchangeTotpMutationHookResult = ReturnType<typeof useExchangeTotpMutation>;
export type ExchangeTotpMutationResult = ApolloReactCommon.MutationResult<ExchangeTotpMutation>;
export type ExchangeTotpMutationOptions = ApolloReactCommon.BaseMutationOptions<ExchangeTotpMutation, ExchangeTotpMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    ok
  }
}
    `;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GitHubSignInDocument = gql`
    mutation GitHubSignIn($code: String!) {
  gitHubSignIn(code: $code) {
    ok
    requiresTOTP
  }
}
    `;
export type GitHubSignInMutationFn = ApolloReactCommon.MutationFunction<GitHubSignInMutation, GitHubSignInMutationVariables>;

/**
 * __useGitHubSignInMutation__
 *
 * To run a mutation, you first call `useGitHubSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGitHubSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gitHubSignInMutation, { data, loading, error }] = useGitHubSignInMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGitHubSignInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GitHubSignInMutation, GitHubSignInMutationVariables>) {
        return ApolloReactHooks.useMutation<GitHubSignInMutation, GitHubSignInMutationVariables>(GitHubSignInDocument, baseOptions);
      }
export type GitHubSignInMutationHookResult = ReturnType<typeof useGitHubSignInMutation>;
export type GitHubSignInMutationResult = ApolloReactCommon.MutationResult<GitHubSignInMutation>;
export type GitHubSignInMutationOptions = ApolloReactCommon.BaseMutationOptions<GitHubSignInMutation, GitHubSignInMutationVariables>;
export const GrantApiKeyDocument = gql`
    mutation GrantAPIKey($uuid: String!) {
  grantAPIKey(uuid: $uuid) {
    ok
  }
}
    `;
export type GrantApiKeyMutationFn = ApolloReactCommon.MutationFunction<GrantApiKeyMutation, GrantApiKeyMutationVariables>;

/**
 * __useGrantApiKeyMutation__
 *
 * To run a mutation, you first call `useGrantApiKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGrantApiKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [grantApiKeyMutation, { data, loading, error }] = useGrantApiKeyMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGrantApiKeyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GrantApiKeyMutation, GrantApiKeyMutationVariables>) {
        return ApolloReactHooks.useMutation<GrantApiKeyMutation, GrantApiKeyMutationVariables>(GrantApiKeyDocument, baseOptions);
      }
export type GrantApiKeyMutationHookResult = ReturnType<typeof useGrantApiKeyMutation>;
export type GrantApiKeyMutationResult = ApolloReactCommon.MutationResult<GrantApiKeyMutation>;
export type GrantApiKeyMutationOptions = ApolloReactCommon.BaseMutationOptions<GrantApiKeyMutation, GrantApiKeyMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...MeFragment
  }
}
    ${MeFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const MyApiKeysDocument = gql`
    query MyAPIKeys {
  me {
    id
    apiKeys {
      id
      description
      createdAt
    }
  }
}
    `;

/**
 * __useMyApiKeysQuery__
 *
 * To run a query within a React component, call `useMyApiKeysQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyApiKeysQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyApiKeysQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyApiKeysQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyApiKeysQuery, MyApiKeysQueryVariables>) {
        return ApolloReactHooks.useQuery<MyApiKeysQuery, MyApiKeysQueryVariables>(MyApiKeysDocument, baseOptions);
      }
export function useMyApiKeysLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyApiKeysQuery, MyApiKeysQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyApiKeysQuery, MyApiKeysQueryVariables>(MyApiKeysDocument, baseOptions);
        }
export type MyApiKeysQueryHookResult = ReturnType<typeof useMyApiKeysQuery>;
export type MyApiKeysLazyQueryHookResult = ReturnType<typeof useMyApiKeysLazyQuery>;
export type MyApiKeysQueryResult = ApolloReactCommon.QueryResult<MyApiKeysQuery, MyApiKeysQueryVariables>;
export const MyOrganizationsDocument = gql`
    query MyOrganizations {
  me {
    id
    personalOrganization {
      id
    }
    organizations {
      id
      name
    }
  }
}
    `;

/**
 * __useMyOrganizationsQuery__
 *
 * To run a query within a React component, call `useMyOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrganizationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyOrganizationsQuery, MyOrganizationsQueryVariables>) {
        return ApolloReactHooks.useQuery<MyOrganizationsQuery, MyOrganizationsQueryVariables>(MyOrganizationsDocument, baseOptions);
      }
export function useMyOrganizationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyOrganizationsQuery, MyOrganizationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyOrganizationsQuery, MyOrganizationsQueryVariables>(MyOrganizationsDocument, baseOptions);
        }
export type MyOrganizationsQueryHookResult = ReturnType<typeof useMyOrganizationsQuery>;
export type MyOrganizationsLazyQueryHookResult = ReturnType<typeof useMyOrganizationsLazyQuery>;
export type MyOrganizationsQueryResult = ApolloReactCommon.QueryResult<MyOrganizationsQuery, MyOrganizationsQueryVariables>;
export const OnboardTotpDocument = gql`
    query OnboardTOTP {
  me {
    id
    name
    onboardTOTP
  }
}
    `;

/**
 * __useOnboardTotpQuery__
 *
 * To run a query within a React component, call `useOnboardTotpQuery` and pass it any options that fit your needs.
 * When your component renders, `useOnboardTotpQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnboardTotpQuery({
 *   variables: {
 *   },
 * });
 */
export function useOnboardTotpQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OnboardTotpQuery, OnboardTotpQueryVariables>) {
        return ApolloReactHooks.useQuery<OnboardTotpQuery, OnboardTotpQueryVariables>(OnboardTotpDocument, baseOptions);
      }
export function useOnboardTotpLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OnboardTotpQuery, OnboardTotpQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OnboardTotpQuery, OnboardTotpQueryVariables>(OnboardTotpDocument, baseOptions);
        }
export type OnboardTotpQueryHookResult = ReturnType<typeof useOnboardTotpQuery>;
export type OnboardTotpLazyQueryHookResult = ReturnType<typeof useOnboardTotpLazyQuery>;
export type OnboardTotpQueryResult = ApolloReactCommon.QueryResult<OnboardTotpQuery, OnboardTotpQueryVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($uuid: String!, $password: String!) {
  resetPassword(uuid: $uuid, password: $password) {
    ok
  }
}
    `;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    ok
    requiresTOTP
  }
}
    `;
export type SignInMutationFn = ApolloReactCommon.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($name: String!, $email: String!, $password: String!) {
  signUp(name: $name, email: $email, password: $password) {
    ok
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UpdateAccountDocument = gql`
    mutation UpdateAccount($name: String!, $email: String!) {
  updateAccount(name: $name, email: $email) {
    ...MeFragment
  }
}
    ${MeFragmentFragmentDoc}`;
export type UpdateAccountMutationFn = ApolloReactCommon.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, baseOptions);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = ApolloReactCommon.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const UpdateApplicationDocument = gql`
    mutation UpdateApplication($id: Int!, $name: String, $description: String, $secret: SecretInput) {
  application(id: $id) {
    update(name: $name, description: $description, secret: $secret) {
      ...ApplicationFragment
    }
  }
}
    ${ApplicationFragmentFragmentDoc}`;
export type UpdateApplicationMutationFn = ApolloReactCommon.MutationFunction<UpdateApplicationMutation, UpdateApplicationMutationVariables>;

/**
 * __useUpdateApplicationMutation__
 *
 * To run a mutation, you first call `useUpdateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateApplicationMutation, { data, loading, error }] = useUpdateApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      secret: // value for 'secret'
 *   },
 * });
 */
export function useUpdateApplicationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateApplicationMutation, UpdateApplicationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateApplicationMutation, UpdateApplicationMutationVariables>(UpdateApplicationDocument, baseOptions);
      }
export type UpdateApplicationMutationHookResult = ReturnType<typeof useUpdateApplicationMutation>;
export type UpdateApplicationMutationResult = ApolloReactCommon.MutationResult<UpdateApplicationMutation>;
export type UpdateApplicationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateApplicationMutation, UpdateApplicationMutationVariables>;
export const UpdateContainerGroupDocument = gql`
    mutation UpdateContainerGroup($applicationID: Int!, $id: Int!, $number: Int!) {
  application(id: $applicationID) {
    updateContainerGroup(id: $id, number: $number) {
      id
      size
      containerCount
      containers {
        id
        status
      }
    }
  }
}
    `;
export type UpdateContainerGroupMutationFn = ApolloReactCommon.MutationFunction<UpdateContainerGroupMutation, UpdateContainerGroupMutationVariables>;

/**
 * __useUpdateContainerGroupMutation__
 *
 * To run a mutation, you first call `useUpdateContainerGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContainerGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContainerGroupMutation, { data, loading, error }] = useUpdateContainerGroupMutation({
 *   variables: {
 *      applicationID: // value for 'applicationID'
 *      id: // value for 'id'
 *      number: // value for 'number'
 *   },
 * });
 */
export function useUpdateContainerGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateContainerGroupMutation, UpdateContainerGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateContainerGroupMutation, UpdateContainerGroupMutationVariables>(UpdateContainerGroupDocument, baseOptions);
      }
export type UpdateContainerGroupMutationHookResult = ReturnType<typeof useUpdateContainerGroupMutation>;
export type UpdateContainerGroupMutationResult = ApolloReactCommon.MutationResult<UpdateContainerGroupMutation>;
export type UpdateContainerGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateContainerGroupMutation, UpdateContainerGroupMutationVariables>;