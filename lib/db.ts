import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';

import { neon as connect, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

neonConfig.fetchConnectionCache = true;
const sql = connect(process.env.DATABASE_URL as string);
export const db = drizzle(sql);

export async function DatabaseTest() {
  // calculate  Latency
  const start: Date = new Date();

  const [dbResponse] = await sql` SELECT NOW();`;
  const dbNow = dbResponse && dbResponse.now ? dbResponse.now : '';
  const end: Date = new Date();
  console.log('Latency :', Math.abs(end.valueOf() - start.valueOf()));
  return { dbNow: dbNow, latency: Math.abs(end.valueOf() - start.valueOf()) };
}

DatabaseTest();
