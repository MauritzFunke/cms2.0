import * as express from 'express';
import * as ejs from 'ejs';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import debug from './classes/debug';
import Repo from './models/Repo';


const config = require('./config/vars');
const keys = require('./config/keys');


const PORT = process.env.PORT || config.PORT;

const app = express();

mongoose.connect('mongodb://' + keys.mongo.user + ':'+keys.mongo.pwd +'@localhost:27017/website', (err) => {
    if (err) throw err;
    debug.log('Connected to MongoDB');
})

app.set('view engine', 'ejs');
app.use(session({
    secret: 'kittensareverymuchfancy',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}))
app.use(bodyParser.json());
app.use('/static/', express.static('./static/'));


app.get('/', (req, res) => {
    
});













app.listen(PORT, (err) => {
    if (err) throw err;
    debug.log('Server started on Port ' + PORT)
})