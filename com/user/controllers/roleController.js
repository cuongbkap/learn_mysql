let router = require('express').Router();
let roleUseCase = require('../useCase/roleUseCase');
let bodyParser = require('body-parser');
let bodyJson = bodyParser.json();
let commonUtil = require('../util/commonUtil');

let path = '/role';

router.get(path.concat('/get-role'),bodyJson,async(req, res)=>{
    let roles = await roleUseCase.getRole(req.headers['jwt']);
    res.setHeader('Content-Type','application/json');
    let messageCode = commonUtil.getHttpCode(roles.message);
    res.status(messageCode);
    return res.json(roles);
});

router.post(path.concat('/create'),bodyJson,async(req, res)=>{
    let roles = await roleUseCase.insert(req.body);
    res.setHeader('Content-Type','application/json');
    return res.json(roles);
});

router.delete(path.concat('/delete/:role_id'),bodyJson,async(req, res)=>{
    let roles = await roleUseCase.delete(req.params.role_id);
    res.setHeader('Content-Type','application/json');
    return res.json(roles);
});

router.put(path.concat('/update'),bodyJson,async(req, res)=>{
    let roles = await roleUseCase.update(req.body);
    res.setHeader('Content-Type','application/json');
    return res.json(roles);
});

module.exports = router;


