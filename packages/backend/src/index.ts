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
import { User } from './entity/User';
import ormconfig from '../ormconfig';
import { buildSchema, AuthChecker } from 'type-graphql';
import { SESSION_NAME } from './constants';
import path from 'path';
import { Context } from './types';

const app = new Koa();
const router = new Router();

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
        client: redis,
    }),
};

app.use(
    cors({
        credentials: true,
    }),
);

app.use(session(SESSION_CONFIG, app));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

async function main() {
    const customAuthChecker: AuthChecker<Context> = ({ context }, roles) => {
        if (!context.user) {
            return false;
        }

        if (!roles || roles.length === 0) {
            return true;
        }

        // TODO: Expand this into other roles eventually:
        if (!roles.includes(context.user.grantType)) {
            return false;
        }

        return true;
    };

    const schema = await buildSchema({
        resolvers: [__dirname + '/resolvers/**/*.{ts,js}'],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
        authChecker: customAuthChecker,
    });

    const server = new ApolloServer({
        schema,
        context: ({ ctx, connection }) => {
            if (connection?.context) {
                return connection.context;
            }

            return {
                user: ctx.user,
                session: ctx.session,
                cookies: ctx.cookies,
                destroySession() {
                    ctx.session = null;
                },
            };
        },
    });

    const connection = await createConnection(ormconfig);

    app.use((ctx, next) => {
        ctx.connection = connection;
        return next();
    });

    app.use(async (ctx, next) => {
        if (ctx.get('Authentication')) {
            ctx.user = await User.fromAPIKey(ctx.get('Authentication').slice('Bearer '.length));
        } else {
            ctx.user = await User.fromSession(ctx.session);
        }

        if (!ctx.user) {
            User.removeUserCookie(ctx.cookies);
        }

        return next();
    });

    server.applyMiddleware({ app, path: '/api/graphql' });

    console.log('Connected to the database.');

    const httpServer = app.listen(1337, () => {
        console.log('Koa server listening on port 1337');
    });

    server.installSubscriptionHandlers(httpServer);
}

main().catch(err => console.error(err));
