module.exports = {
    src: './src',
    schema: '../backend/src/schema.gql',
    exclude: ['**/node_modules/**', '**/queries/**', '**/__generated__/**'],
    extensions: ['ts', 'tsx'],
    language: 'typescript',
    customScalars: {
        DateTime: 'String',
    },
};
