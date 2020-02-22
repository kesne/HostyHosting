module.exports = {
    client: {
        includes: ['./packages/**/*.graphql'],
        service: {
            name: 'daas',
            localSchemaFile: './packages/backend/schema.graphql'
        }
    },
    service: {
        localSchemaFile: './packages/backend/schema.graphql'
    }
};
