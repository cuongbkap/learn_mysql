let userRoleDao = require('../dao/userRoleDao');
let commonUtil = require('../util/commonUtil');
let method = {};

method.getUserRole = (token) => {
    let tokenValid = commonUtil.verify(token);
    if(tokenValid.message != 'SUCCESS'){
        return tokenValid;
    }
    let obj = {user_name: tokenValid.objToken.user_name};
    return userRoleDao.getUserRole(obj).then(data => data).catch(error => error);
}

let checkValidInsert = (obj) => {
    let mess = '';
    if(!obj.user_id) {
        mess = mess.concat('user_id invalid');
    }
    if(!obj.role_id) {
        mess = mess.concat('role_id invalid');
    }
    if(mess){
        return {message:'ERROR',data:mess};
    }
    return {message:'SUCCESS',data:mess};
}

method.insert = (obj) => {
    if(checkValidInsert(obj).message != 'SUCCESS') return checkValidInsert(obj);
    return userRoleDao.insert(obj).then(data => data).catch(error => error);
}

method.delete = (obj) => {
    return userRoleDao.delete(obj).then(data => data).catch(error => error);
}

method.update = (obj) => {
    return userRoleDao.update(obj).then(data => data).catch(error => error);
}