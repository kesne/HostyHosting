export declare type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: any;
};
export declare type ApiKey = {
    id: Scalars['Int'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
};
export declare type Application = {
    id: Scalars['Int'];
    name: Scalars['String'];
    description: Scalars['String'];
    createdBy?: Maybe<User>;
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    organization: Organization;
    containerGroups: Array<ContainerGroup>;
    deployments: Array<Deployment>;
    secrets: Array<Secret>;
};
export declare type ApplicationMutations = {
    delete: Application;
    update: Application;
    createDeployment: Deployment;
    updateDeployment: Deployment;
    deleteDeployment: Deployment;
    createContainerGroup: ContainerGroup;
    updateContainerGroup: ContainerGroup;
    deleteContainerGroup: ContainerGroup;
};
export declare type ApplicationMutationsUpdateArgs = {
    secret?: Maybe<SecretInput>;
    description?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
};
export declare type ApplicationMutationsCreateDeploymentArgs = {
    strategy: DeploymentStrategy;
    label: Scalars['String'];
    image: Scalars['String'];
};
export declare type ApplicationMutationsUpdateDeploymentArgs = {
    image: Scalars['String'];
    id: Scalars['Int'];
};
export declare type ApplicationMutationsDeleteDeploymentArgs = {
    id: Scalars['Int'];
};
export declare type ApplicationMutationsCreateContainerGroupArgs = {
    number: Scalars['Int'];
    size: Scalars['Int'];
    deployment: Scalars['Int'];
    label: Scalars['String'];
};
export declare type ApplicationMutationsUpdateContainerGroupArgs = {
    number?: Maybe<Scalars['Int']>;
    label?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
};
export declare type ApplicationMutationsDeleteContainerGroupArgs = {
    id: Scalars['Int'];
};
export declare type Container = {
    id: Scalars['Int'];
    status: Scalars['String'];
};
export declare type ContainerGroup = {
    id: Scalars['Int'];
    label: Scalars['String'];
    size: ContainerSize;
    containerCount: Scalars['Float'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    deployment: Deployment;
    containers: Array<Container>;
};
export declare enum ContainerSize {
    S1x1 = "S1x1",
    S2x2 = "S2x2",
    S4x4 = "S4x4",
    S8x8 = "S8x8",
    S16x16 = "S16x16"
}
export declare type Deployment = {
    id: Scalars['Int'];
    label: Scalars['String'];
    strategy: DeploymentStrategy;
    image: Scalars['String'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    containerGroups: Array<ContainerGroup>;
};
export declare enum DeploymentStrategy {
    Replace = "REPLACE",
    Recreate = "RECREATE"
}
export declare type Mutation = {
    createAPIKeyRequest: Scalars['String'];
    grantAPIKey: Result;
    application: ApplicationMutations;
    organization: OrganizationMutations;
    exchangeTOTP: Result;
    enableTotp: Result;
    disableTotp: Result;
    signUp: Result;
    signIn: SignInResult;
    updateAccount: User;
    forgotPassword: Result;
    resetPassword: Result;
};
export declare type MutationGrantApiKeyArgs = {
    uuid: Scalars['String'];
};
export declare type MutationApplicationArgs = {
    id: Scalars['Int'];
};
export declare type MutationOrganizationArgs = {
    id?: Maybe<Scalars['Int']>;
};
export declare type MutationExchangeTotpArgs = {
    token: Scalars['String'];
};
export declare type MutationEnableTotpArgs = {
    token: Scalars['String'];
    secret: Scalars['String'];
};
export declare type MutationDisableTotpArgs = {
    password: Scalars['String'];
};
export declare type MutationSignUpArgs = {
    password: Scalars['String'];
    email: Scalars['String'];
    name: Scalars['String'];
};
export declare type MutationSignInArgs = {
    password: Scalars['String'];
    email: Scalars['String'];
};
export declare type MutationUpdateAccountArgs = {
    email?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
};
export declare type MutationForgotPasswordArgs = {
    email: Scalars['String'];
};
export declare type MutationResetPasswordArgs = {
    password: Scalars['String'];
    uuid: Scalars['String'];
};
export declare type Organization = {
    id: Scalars['Int'];
    isPersonal: Scalars['Boolean'];
    name: Scalars['String'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    applications: Array<Application>;
};
export declare type OrganizationMutations = {
    createApplication: Application;
};
export declare type OrganizationMutationsCreateApplicationArgs = {
    description?: Maybe<Scalars['String']>;
    name: Scalars['String'];
};
export declare type Query = {
    getAPIKeyFromRequest?: Maybe<Scalars['String']>;
    application: Application;
    organization: Organization;
    me: User;
};
export declare type QueryGetApiKeyFromRequestArgs = {
    uuid: Scalars['String'];
};
export declare type QueryApplicationArgs = {
    id: Scalars['Int'];
};
export declare type QueryOrganizationArgs = {
    id?: Maybe<Scalars['Int']>;
};
/** Provides a boolean to determine if the action was successful or not. */
export declare type Result = {
    ok: Scalars['Boolean'];
};
export declare type Secret = {
    key: Scalars['String'];
    value: Scalars['String'];
};
export declare type SecretInput = {
    key: Scalars['String'];
    value: Scalars['String'];
};
/**
 * A special type of result used just for SignIns. Provides a boolean for if the
 * user requires a TOTP exchange before being fully logged in.
 */
export declare type SignInResult = {
    ok: Scalars['Boolean'];
    requiresTOTP: Scalars['Boolean'];
};
export declare type User = {
    id: Scalars['Int'];
    name: Scalars['String'];
    email: Scalars['String'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    hasTOTP: Scalars['Boolean'];
    personalOrganization: Organization;
    apiKeys: Array<ApiKey>;
    onboardTOTP: Scalars['String'];
    organizations: Array<Organization>;
};
export declare type CreateApiKeyRequestMutationVariables = {};
export declare type CreateApiKeyRequestMutation = Pick<Mutation, 'createAPIKeyRequest'>;
export declare type GetApiKeyFromRequestQueryVariables = {
    uuid: Scalars['String'];
};
export declare type GetApiKeyFromRequestQuery = Pick<Query, 'getAPIKeyFromRequest'>;
export declare const CreateApiKeyRequest: import("graphql").DocumentNode;
export declare const GetApiKeyFromRequest: import("graphql").DocumentNode;
