import mysql, {Pool} from 'mysql2';

const pool: Pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    dateStrings: true,
    database: process.env.MYSQL_DATABASE
});

export const query = <T>(sql: string, params: string[] | number[] | string | number): Promise<T> =>
    new Promise<T>((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) reject(error);
            else resolve(results as unknown as T);
        });
    });