let jwt = require('jsonwebtoken');
let key = 'cuong';
let method = {};

method.createToken = (obj) => {
    try {
        return {message:'SUCCESS',token:jwt.sign(JSON.parse(JSON.stringify(obj)),key)}
    } catch (error) {
        return {message:'ERROR',detail:error}
    }
}

method.verify = (token) => {
    try {
        let objToken = jwt.verify(token,key);
        if(objToken.user_id){
            return {message:'SUCCESS',objToken:objToken};
        }
        return {message:'ERROR',detail:'Token error'};
    } catch (error) {
        return {message:'ERROR',detail:error};
    }
}

method.getHttpCode = (messageCode) => {
    if(messageCode == 'SUCCESS'){
        return 200;
    }
    return 500;
}

module.exports = method;