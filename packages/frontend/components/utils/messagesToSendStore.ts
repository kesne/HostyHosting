import create from 'zustand';
import produce from 'immer';
import { Sender, Message } from '../../queries';

let oid = -1;
function getOptimisticId() {
    return oid--;
}

export const [useStore] = create(set => ({
    messagesByThreadID: {},

    add: (threadID: number, message: string) =>
        set(
            produce(state => {
                if (!state.messagesByThreadID[threadID]) {
                    state.messagesByThreadID[threadID] = [];
                }

                state.messagesByThreadID[threadID].unshift({
                    threadID,
                    id: getOptimisticId(),
                    body: message,
                    sender: Sender.Self,
                    createdAt: String(Date.now()),
                    updatedAt: String(Date.now()),
                    seen: true
                });
            })
        ),

    remove: (threadID: number, messageID: number) =>
        set(
            produce(state => {
                if (!state.messagesByThreadID[threadID]) {
                    return state;
                }

                const messageIndex = state.messagesByThreadID[threadID].findIndex(
                    (message: Message) => message.id === messageID
                );

                if (messageIndex === -1) {
                    return state;
                }

                state.messagesByThreadID[threadID].splice(messageIndex, 1);
            })
        )
}));
