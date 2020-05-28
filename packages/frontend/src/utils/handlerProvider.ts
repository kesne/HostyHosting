import { Handler } from 'relay-runtime/lib/store/RelayStoreTypes';
import { ConnectionHandler } from 'relay-runtime';

export default function handlerProvider(handle: string): Handler {
    switch (handle) {
        case 'connection':
            return ConnectionHandler;
	}

    throw new Error(`Relay HandlerProvider: No handler provided for \`${handle}\`.`);
}
