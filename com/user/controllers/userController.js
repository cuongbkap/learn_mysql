let router = require('express').Router();
let userUseCase = require('../useCase/userUseCase');
let bodyParser = require('body-parser');
let bodyJson = bodyParser.json();
let commonUtil = require('../util/commonUtil');

let path = '/user';

router.get(path.concat('/get-user'),bodyJson,async(req, res)=>{
    let users = await userUseCase.getUser(req.headers['jwt']);
    res.setHeader('Content-Type','application/json');
    let messageCode = commonUtil.getHttpCode(users.message);
    res.status(messageCode);
    return res.json(users);
});

router.get(path.concat('/get-all'),bodyJson,async(req, res)=>{
    let users = await userUseCase.getAllUser(req.query,req.headers['jwt']);
    res.setHeader('Content-Type','application/json');
    let messageCode = commonUtil.getHttpCode(users.message);
    res.status(messageCode);
    return res.json(users);
});

router.post(path.concat('/register'),bodyJson,async(req, res)=>{
    let users = await userUseCase.insert(req.body);
    res.setHeader('Content-Type','application/json');
    return res.json(users);
});

router.post(path.concat('/login'),bodyJson,async(req, res)=>{
    let users = await userUseCase.login(req.body.user_name,req.body.pass_word);
    res.setHeader('Content-Type','application/json');
    let messageCode = commonUtil.getHttpCode(users.message);
    res.status(messageCode);
    return res.json(users);
});

router.delete(path.concat('/delete/:user_id'),bodyJson,async(req, res)=>{
    let users = await userUseCase.delete(req.params.user_id);
    res.setHeader('Content-Type','application/json');
    return res.json(users);
});

router.put(path.concat('/update'),bodyJson,async(req, res)=>{
    let users = await userUseCase.update(req.body);
    res.setHeader('Content-Type','application/json');
    return res.json(users);
});

module.exports = router;


