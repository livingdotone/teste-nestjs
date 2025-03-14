export default () => ({
    environment: process.env.NODE_ENV ?? 'local',
    database: {
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    }
})