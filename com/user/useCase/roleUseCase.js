let roleDao = require('../dao/roleDao');
let commonUtil = require('../util/commonUtil');
let method = {};

method.getRole = (token) => {
    let tokenValid = commonUtil.verify(token);
    if(tokenValid.message != 'SUCCESS'){
        return tokenValid;
    }
    if(tokenValid.objToken.role_id > 2){
        return {message:'ERROR',detail:'token invalid'};
    }
    let obj = {user_name: tokenValid.objToken.user_name};
    return roleDao.getRole(obj).then(data => data).catch(error => error);
}

let checkValidInsert = (obj) => {
    let mess = '';
    if(!obj.role_name) {
        mess = mess.concat('role_name invalid');
    }
    if(mess){
        return {message:'ERROR',data:mess};
    }
    return {message:'SUCCESS',data:mess};
}

method.insert = (obj) => {
    if(checkValidInsert(obj).message != 'SUCCESS') return checkValidInsert(obj);
    if(tokenValid.objToken.role_id != 1){
        return {message:'ERROR',detail:'token invalid'};
    }
    return roleDao.insert(obj).then(data => data).catch(error => error);
}

method.delete = (obj) => {
    if(tokenValid.objToken.role_id != 1){
        return {message:'ERROR',detail:'token invalid'};
    }
    return roleDao.delete(obj).then(data => data).catch(error => error);
}

method.update = (obj) => {
    if(tokenValid.objToken.role_id != 1){
        return {message:'ERROR',detail:'token invalid'};
    }
    return roleDao.update(obj).then(data => data).catch(error => error);
}

module.exports = method;