let userDao = require('../dao/userDao');
let commonUtil = require('../util/commonUtil');
let method = {};

method.getUser = (token) => {
    let tokenValid = commonUtil.verify(token);
    if(tokenValid.message != 'SUCCESS'){
        return tokenValid;
    }
    let obj = {user_name: tokenValid.objToken.user_name};
    return userDao.getUser(obj).then(data => data).catch(error => error);
}

method.getAllUser = (obj,token) => {
    let tokenValid = commonUtil.verify(token);
    if(tokenValid.message != 'SUCCESS'){
        return tokenValid;
    }
    if(tokenValid.objToken.role_id > 2 || tokenValid.objToken.role_id == null){
        return {message:'ERROR',detail:'token invalid'};
    }
    return userDao.getUser(obj).then(data => data).catch(error => error);
}

let checkValidInsert = (obj) => {
    let mess = '';
    if(!obj.user_name) {
        mess = mess.concat('user_name invalid');
    }
    if(!obj.pass_word) {
        mess = mess.concat('pass_word invalid');
    }
    if(!obj.full_name) {
        mess = mess.concat('full_name invalid');
    }
    if(!obj.birthday) {
        mess = mess.concat('birthday invalid');
    }
    if(!obj.address) {
        mess = mess.concat('address invalid');
    }
    if(mess){
        return {message:'ERROR',data:mess};
    }
    return {message:'SUCCESS',data:mess};
}

method.insert = (obj) => {
    if(checkValidInsert(obj).message != 'SUCCESS') return checkValidInsert(obj);
    // if(tokenValid.objToken.role_id > 2){
    //     return {message:'ERROR',detail:'token invalid'};
    // }
    return userDao.insert(obj).then(data => data).catch(error => error);
}

method.delete = (obj) => {
    // let tokenValid = commonUtil.verify(token);
    // if(tokenValid.message != 'SUCCESS'){
    //     return tokenValid;
    // }
    // if(tokenValid.objToken.role_id > 2){
    //     return {message:'ERROR',detail:'token invalid'};
    // }
    return userDao.delete(obj).then(data => data).catch(error => error);
}

method.update = (obj) => {
    if(tokenValid.objToken.role_id > 2){
        return {message:'ERROR',detail:'token invalid'};
    }
    return userDao.update(obj).then(data => data).catch(error => error);
}

let checkValidLogin = (user_name,pass_word) => {
    let mess =  '';
    if(!user_name){
        mess = mess.concat('user_name invalid');
    }
    if(!pass_word){
        mess = mess.concat('pass_word invalid');
    }
    if(mess){
        return {message:'ERROR',data:mess};
    }
    return {message:'SUCCESS',data:mess};
}

method.login = (user_name,pass_word) => {
    let obj = {user_name:user_name,pass_word:pass_word};
    if(checkValidLogin(user_name,pass_word).message != 'SUCCESS'){
        return checkValidLogin(user_name,pass_word);
    }
    return userDao
        .getUser(obj)
        .then((result) => {
            if(result.message == 'SUCCESS' && result.data.length){
                let token = commonUtil.createToken(result.data[0]);
                result.token = token;
            }else{
                result.message = 'ERROR';
                result.data = {detail:'user invalid'};
            }
            return result;
        })
    .catch(err => err);
}

module.exports = method;