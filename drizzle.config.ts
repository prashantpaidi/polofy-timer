import type { Config } from 'drizzle-kit';

const DATABASE_URL: string = process.env.DATABASE_URL as string;

const config: Config = {
  schema: ['./db/schema/users.ts', './db/schema/songs.ts'],
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: DATABASE_URL,
  },
};

export default config;
