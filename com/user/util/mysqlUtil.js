let mysql = require('mysql2');
let method = {};

let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'demo_user',
});

let connection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((error,connection) => {
            if(error) {
                return reject({message:'ERROR',data:error});
            }
            return resolve({message:'SUCCESS',data:connection});
        });
    });
}

let destroyConnection = (connection) => {
    connection.release();
    connection.destroy();
}

let query = (sql,obj,connection) => {
    return new Promise((resolve, reject) =>{
        connection.query(sql,obj,(error,res) =>{
            destroyConnection(connection);
            if(error){
                return reject({message:'ERROR',data:error});
            }
            return resolve({message:'SUCCESS',data:res});
        });
    });
}

method.select = (sql,obj) => connection().then(data => query(sql,obj,data.data)).catch(error => error);
method.insert = (sql,obj) => connection().then(data => query(sql,obj,data.data)).catch(data => error);
method.update = (sql,obj) => connection().then(data => query(sql,obj,data.data)).catch(error => error);
method.delete = (sql,obj) => connection().then(data => query(sql,obj,data.data)).catch(error => error);

module.exports = method;