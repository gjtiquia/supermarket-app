import 'dotenv/config'; // TODO : use t3 env
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(process.env.DATABASE_URL!);
