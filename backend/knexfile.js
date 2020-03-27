// Update with your config settings.

module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './src/database/db.sqlite '
        },
        migrations: {
            directory: './src/database/migrations'
        },
        useNullAsDefault: true,
    },

    test: {
        client: 'sqlite3',
        connection: {
            filename: './src/database/test.sqlite '
        },
        migrations: {
            directory: './src/database/migrations'
        },
        useNullAsDefault: true,
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host : 'remotemysql.com',
            database: 'YDUJZ8x6mX',
            user: 'YDUJZ8x6mX',
            password: 'pA0aMgiIY1'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './src/database/migrations',
        }
    }

};