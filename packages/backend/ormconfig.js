const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: !isProd,
    entities: [isProd ? 'lib/entity/**/*.ts' : 'src/entity/**/*.ts'],
    migrations: [isProd ? 'lib/migration/**/*.ts' : 'src/migration/**/*.ts'],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration'
    }
};
