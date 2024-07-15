// src/libs/db.js
import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'first',
    password: 'harinima',
    port: 5432,
});

export default pool;
