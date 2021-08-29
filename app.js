let express = require('express');
let app = express();
let userController = require('./com/user/controllers/userController');
let roleController = require('./com/user/controllers/roleController');
let cors = require('cors');
app.use(cors({origin:['http://localhost:2000']}));
app.listen(9000);
app.use(userController);
app.use(roleController);
app.get('/',(req, res) => {
    res.send('mysql');
})