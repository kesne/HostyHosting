import { Resolvers } from '../../schema.graphql';
import QueryResolvers from './Query';
import MutationResolvers from './Mutation';
import { Context } from '../../types';
// import SubscriptionResolvers from './Subscription';
import UserResolvers from './User';
import ApplicationResolvers from './Application';

const resolvers: Resolvers<Context> = {
    Query: {
        ...QueryResolvers
    },
    Mutation: {
        ...MutationResolvers
    },
    // Subscription: {
    //     ...SubscriptionResolvers
    // },
    Application: {
        ...ApplicationResolvers,
    },
    User: {
        ...UserResolvers
    }
};

export default resolvers;
