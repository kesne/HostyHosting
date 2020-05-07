import { AsyncLocalStorage } from 'async_hooks';
import { ParameterizedContext } from 'koa';
import { Session } from '../types';

type Context = ParameterizedContext & { session: Session };

const currentRequest = new AsyncLocalStorage<Context>();

export function getCurrentRequest() {
    const ctx = currentRequest.getStore();
    if (!ctx) {
        throw new Error(
            'No current request was found, are you calling this method from outer space?',
        );
    }
    return ctx;
}

export function run(ctx: Context, callback: () => Promise<void>) {
    return (currentRequest.run(ctx, callback) as unknown) as Promise<void>;
}
