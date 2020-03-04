import { Resolvers } from '../../schema.graphql';
import QueryResolvers from './Query';
import MutationResolvers from './Mutation';
import UserResolvers from './User';
import ApplicationResolvers from './Application';
import ApplicationMutationsResolvers from './ApplicationMutations';
import { Context } from '../../types';
// import SubscriptionResolvers from './Subscription';

const resolvers: Resolvers<Context> = {
    Query: QueryResolvers,
    Mutation: MutationResolvers,
    Application: ApplicationResolvers,
    ApplicationMutations: ApplicationMutationsResolvers,
    User: UserResolvers,
    // Subscription: SubscriptionResolvers,
};

export default resolvers;
