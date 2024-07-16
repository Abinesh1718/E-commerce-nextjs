// src/lib/db.js

import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,  // This is sometimes required for Heroku or cloud databases
    },
});

export default pool;
