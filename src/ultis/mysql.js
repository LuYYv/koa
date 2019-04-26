import mysql from 'mysql';

let pool = null;

export const createConnectionPool = async (config) => {
    let mysql_config = {
        host: config.HOST,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DATABASE,
        port: config.PORT
    }
    let cnt = await mysql.createConnection(mysql_config);
    await new Promise((resolve, reject) => {
        cnt.connect((err) => {
            if (err) {
                console.log('数据库连接异常');
                console.log(err);
            } else {
                console.log('数据库连接成功');
                pool = mysql.createPool(mysql_config);
                resolve();
            }
        })
    })
      
}

//insert into user_log (id, username, password) values (?, ?, ?)
//[iuqowyriuqwyer, hehe, 123123]

//seelct * from user_login

export const query = async (sql, value) => {
    return await new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(4002);
            } else {
                connection.query(sql, value, (err, res) => {
                    if (err) {
                        console.log(err);
                        reject(4003);
                    } else {
                        resolve(res);
                    }
                    connection.release();
                })
            }
        })
    })
}