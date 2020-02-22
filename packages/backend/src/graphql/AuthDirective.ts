import { AuthenticationError } from 'apollo-server-koa';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { GraphQLField, defaultFieldResolver } from 'graphql';

export default class AuthDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<any, any>) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function(...args) {
            const [,, context] = args;
            if (!context.user) {
                throw new AuthenticationError('NO AUTH FOUND');
            }
            return await resolve.apply(this, args);
        };
    }
}
