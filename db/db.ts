import mysql from 'mysql2/promise';

export const retrieveData = async () => {
    const db = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT!),
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    });
    return db.execute('select * from EVENTS').then(
        query => {
            console.log(query.at(0))
        }
    );
}