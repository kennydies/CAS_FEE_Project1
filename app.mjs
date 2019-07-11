import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import {todoRoutes} from './routes/todoRoutes';

const app = express();

const router = express.Router();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));

// TODO: change jwt Params for production
app.use(bodyParser.json());

app.get('/', function (req, res) {
   res.sendFile('/html/index.html', {root: __dirname + '/public/'});
});

app.use('/todos', todoRoutes);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});