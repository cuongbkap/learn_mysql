let mysql = require('../util/mysqlUtil');
let method = {};

method.getUserRole = (obj) => {
    let sql = 'SELECT * FROM user_role WHERE 1 = 1';
    let values = [];
    if(obj.user_role_id){
        sql = sql.concat(' AND user_role_id = ?');
        values.push(obj.user_role_id);
    }
    if(obj.user_id){
        sql = sql.concat(' AND user_id = ?');
        values.push(obj.user_id);
    }
    if(obj.role_id){
        sql = sql.concat(' AND role_id = ?');
        values.push(obj.role_id);
    }
    return mysql.select(sql,values).then(data => data).catch(err => err);
}

method.insert = (obj) => {
    let sql = 'INSERT INTO user_role( ';
    let values = [];
    let values_sql = [];
    let columns = [];
    if(obj.user_id){
        columns.push('user_id');
        values_sql.push('?');
        values.push(obj.user_id);
    }
    if(obj.role_id){
        columns.push('role_id');
        values_sql.push('?');
        values.push(obj.role_id);
    }
    sql = sql.concat(columns.toString()).concat(' ) VALUES (').concat(values_sql.toString()).concat(' )');
    return mysql.insert(sql,values).then(data => data).catch(err => err);
}

method.delete = (obj) => {
    sql = 'DELETE FROM user_role WHERE user_role_id = ?',obj.user_role_id;
    return mysql.delete(sql,obj).then(data => data).catch(err =>err);
}

method.update = (obj) => {
    sql = 'UPDATE user_role SET '
    let values = [];
    let columns = [];
    if(obj.user_id){
        values.push(obj.user_id);
        columns.push('user_id = ?');
    }
    if(obj.role_id){
        values.push(obj.role_id);
        columns.push('role_id = ?');
    }
    if(obj.user_role_id){
        values.push(obj.user_role_id);
    }
    sql = sql.concat(columns.toString()).concat(' WHERE user_role_id = ?');
    return mysql.update(sql,values).then(data => data).catch(err => err);
}

module.exports = method;