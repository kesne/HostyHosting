import { gql } from 'apollo-server-koa';
import fs from 'fs';
import path from 'path';

export default gql(
    fs.readFileSync(path.join(__dirname, '..', '..', 'schema.graphql'), 'utf8')
);
