import { DocumentNode } from 'graphql';
declare class Client {
    endpoint: string;
    query<ReturnType = any, Vars = Record<string, any>>(query: DocumentNode, variables?: Vars): Promise<ReturnType>;
}
declare const _default: Client;
export default _default;
