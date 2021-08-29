let mysql = require('../util/mysqlUtil');
let method = {};
let md5 = require('md5');

method.getUser = (obj) => {
    let sql = 'SELECT t1.user_id user_id,t1.user_name user_name,t1.pass_word password,t1.full_name full_name,t1.birthday birthday,t1.address address,t3.role_id role_id,t3.role_name FROM user t1 LEFT JOIN user_role t2 ON t1.user_id = t2.user_id LEFT JOIN role t3 ON t2.role_id = t3.role_id WHERE 1 = 1';
    let values = [];
    if(obj.user_id){
        sql = sql.concat(' AND t1.user_id = ?');
        values.push(obj.user_id);
    }
    if(obj.user_name){
        sql = sql.concat(' AND t1.user_name = ?');
        values.push(obj.user_name);
    }
    if(obj.pass_word){
        sql = sql.concat(' AND t1.pass_word = ?');
        values.push(md5(obj.pass_word));
    }
    if(obj.full_name){
        sql = sql.concat(' AND t1.full_name = ?');
        values.push(obj.full_name);
    }
    if(obj.birthday){
        sql = sql.concat(' AND t1.birthday = ?');
        values.push(obj.birthday);
    }
    if(obj.address){
        sql = sql.concat(' AND t1.address = ?');
        values.push(obj.address);
    }
    
    return mysql.select(sql,values).then(data => data).catch(err => err);
}

method.insert = (obj) => {
    let sql = 'INSERT INTO user( ';
    let values = [];
    let values_sql = [];
    let columns = [];
    if(obj.user_name){
        columns.push('user_name');
        values_sql.push('?');
        values.push(obj.user_name);
    }
    if(obj.pass_word){
        columns.push('pass_word');
        values_sql.push('?');
        values.push(md5(obj.pass_word));
    }
    if(obj.full_name){
        columns.push('full_name');
        values_sql.push('?');
        values.push(obj.full_name);
    }
    if(obj.birthday){
        columns.push('birthday');
        values_sql.push('?');
        values.push(obj.birthday);
    }
    if(obj.address){
        columns.push('address');
        values_sql.push('?');
        values.push(obj.address);
    }
    sql = sql.concat(columns.toString()).concat(' ) VALUES (').concat(values_sql.toString()).concat(' )');
    return mysql.insert(sql,values).then(data => data).catch(err => err);
}

method.delete = (obj) => {
    sql = 'DELETE FROM user WHERE user_id = ?',obj.user_id;
    return mysql.delete(sql,obj).then(data => data).catch(err =>err);
}

method.update = (obj) => {
    sql = 'UPDATE user SET '
    let values = [];
    let columns = [];
    if(obj.user_name){
        values.push(obj.user_name);
        columns.push('user_name = ?');
    }
    if(obj.pass_word){
        values.push(md5(obj.pass_word));
        columns.push('pass_word = ?');
    }
    if(obj.full_name){
        values.push(obj.full_name);
        columns.push('full_name = ?');
    }
    if(obj.birthday){
        values.push(obj.birthday);
        columns.push('birthday = ?');
    }
    if(obj.address){
        values.push(obj.address);
        columns.push('address = ?');
    }
    if(obj.user_id){
        values.push(obj.user_id);
    }
    sql = sql.concat(columns.toString()).concat(' WHERE user_id = ?');
    return mysql.update(sql,values).then(data => data).catch(err => err);
}

module.exports = method;
