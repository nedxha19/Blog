import mysql from 'mysql2/promise';

import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from '$env/static/private';

let connection = null;

export async function createConnection() {

    if (!connection) {

        connection = await mysql.createConnection({

            host: DB_HOST,

            user: DB_USER,

            password: DB_PASSWORD,

            database: DB_NAME,

            port: DB_PORT //  Ke me i shtu ikyt ma nedit  edhe me shtu te importi njat DB_HOST  qe ta kam vu nelt 

        });

    }

    return connection;

}

