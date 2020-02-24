import 'reflect-metadata';
import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import redisStore from 'koa-redis';
import { ApolloServer } from 'apollo-server-koa';
import { createConnection } from 'typeorm';
import redis from './redis';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { User } from './entity/User';
import AuthDirective from './graphql/AuthDirective';
import ormconfig from '../ormconfig';
import cookie from 'cookie';
import { SESSION_NAME } from './constants';

const app = new Koa();
const router = new Router();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        auth: AuthDirective
    },
    subscriptions: {
        path: '/api/graphql/subscriptions',
        onConnect: async (_connectionParams, _websocket, context) => {
            // TODO: Use KeyGrip to verify the cookie:
            const cookies = cookie.parse(context.request.headers.cookie!);
            const sessionID = cookies[SESSION_NAME];
            const sessionData = await redis.get(sessionID);
            if (!sessionData) {
                throw new Error('Could not authenticate from session.');
            }

            const session = JSON.parse(sessionData);
            const user = await User.fromSession(session);

            if (!user) {
                throw new Error('Session did not contain a user.');
            }

            return {
                user,
                session
            };
        }
    },
    context: ({ ctx, connection }) => {
        if (connection?.context) {
            return connection.context;
        }

        return {
            user: ctx.user,
            organization: ctx.organization,
            session: ctx.session,
            cookies: ctx.cookies
        };
    }
});

// TODO: Why is this defined up here?
const auth: Koa.Middleware = async (ctx, next) => {
    ctx.user = await User.fromSession(ctx.session);
    if (ctx.user) {
        ctx.organization = await ctx.user.organization;
    }

    return next();
};

app.keys = ['Some key here ignore'];

const SESSION_CONFIG = {
    key: SESSION_NAME,
    maxAge: 86400000 * 14,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,
    renew: false,
    store: redisStore({
        client: redis
    })
};

app.use(
    cors({
        credentials: true
    })
);

app.use(session(SESSION_CONFIG, app));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

async function main() {
    const connection = await createConnection(ormconfig);

    app.use((ctx, next) => {
        ctx.connection = connection;
        return next();
    });

    app.use(auth);

    server.applyMiddleware({ app, path: '/api/graphql' });

    console.log('Connected to the database.');

    const httpServer = app.listen(1337, () => {
        console.log('Koa server listening on port 1337');
    });

    server.installSubscriptionHandlers(httpServer);
}

main().catch(err => console.error(err));
