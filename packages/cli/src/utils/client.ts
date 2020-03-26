import axios from 'axios';
import { DocumentNode } from 'graphql';
import { print } from 'graphql/language';

class Client {
    endpoint = 'http://localhost:3000/api/graphql';

    async query<ReturnType = any, Vars = Record<string, any>>(
        query: DocumentNode,
        variables?: Vars,
    ): Promise<ReturnType> {
        const res = await axios.post(this.endpoint, {
            query: print(query),
            variables,
        });

        return res.data.data;
    }
}

export default new Client();
