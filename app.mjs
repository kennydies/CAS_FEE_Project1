import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import jwt from 'express-jwt';

// import {indexRoutes} from './routes/indexRoutes';
import {todoRoutes} from './routes/todoRoutes';

const app = express();

const router = express.Router();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));

app.use(bodyParser.json());
const jwtSecret = 'gcW&rY7kXN#FuR-az!LZ4=Z^s7xDWHEdP*mqshG4-+uE!g6fhr';

app.set("jwt-secret", jwtSecret);
app.set("jwt-sign", {expiresIn: "1d", audience: "self", issuer: "todo"});
app.set("jwt-validate", {secret: jwtSecret, audience: "self", issuer: "todo"});

app.get('/', function (req, res) {
   // res.sendFile('/html/index.html', {root: __dirname + '/public/'});
});

// app.use('/', indexRoutes);
app.use(jwt( app.get('jwt-validate')));
app.use('/todos', todoRoutes);

app.use(function (err, req, res, next) {
    if(err.name === 'UnauthorizedError'){
        res.status(401).send('No token / Invalid token provided');
    } else {
        next(err);
    }
});

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});