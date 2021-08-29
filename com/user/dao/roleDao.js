let mysql = require('../util/mysqlUtil');
let method = {};

method.getRole = (obj) => {
    let sql = 'SELECT * FROM role WHERE 1 = 1';
    let values = [];
    if(obj.role_id){
        sql = sql.concat(' AND role_id = ?');
        values.push(obj.role_id);
    }
    if(obj.role_name){
        sql = sql.concat(' AND role_name = ?');
        values.push(obj.role_name);
    }
    return mysql.select(sql,values).then(data => data).catch(err => err);
}

method.insert = (obj) => {
    let sql = 'INSERT INTO role( ';
    let values = [];
    let values_sql = [];
    let columns = [];
    if(obj.role_name){
        columns.push('role_name');
        values_sql.push('?');
        values.push(obj.role_name);
    }
    sql = sql.concat(columns.toString()).concat(' ) VALUES (').concat(values_sql.toString()).concat(' )');
    return mysql.insert(sql,values).then(data => data).catch(err => err);
}

method.delete = (obj) => {
    sql = 'DELETE FROM role WHERE role_id = ?',obj.role_id;
    return mysql.delete(sql,obj).then(data => data).catch(err =>err);
}

method.update = (obj) => {
    sql = 'UPDATE role SET '
    let values = [];
    let columns = [];
    if(obj.role_name){
        values.push(obj.role_name);
        columns.push('role_name = ?');
    }
    if(obj.role_id){
        values.push(obj.role_id);
    }
    sql = sql.concat(columns.toString()).concat(' WHERE role_id = ?');
    return mysql.update(sql,values).then(data => data).catch(err => err);
}

module.exports = method;