export const Configuration = () => ({
  development: process.env.NODE_ENV !== 'production',
  host: process.env.APP_HOST,
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  prefix: 'api',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  session: {
    key: process.env.SESSION_COOKIE_KEY || 'sid',
    secret: process.env.SESSION_SECRET,
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    },
  },
});
