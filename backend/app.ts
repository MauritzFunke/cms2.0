import * as mongoose from 'mongoose';
import Debug from './classes/debug';
import Scheduler from './classes/Scheduler';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import Api from './classes/Api';
import githubRequest from './classes/githubRequest';

const keys = require('./config/keys');
const vars = require('./config/vars');

const app = express();
const PORT = process.env.PORT || vars.PORT;
const ghRq = new githubRequest("BumseBine");


app.use(bodyParser.json());
app.use(auth);

mongoose.connect('mongodb://' + keys.mongo.user + ':'+keys.mongo.pwd +'@localhost:27017/website', { useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if (err) throw err;
    Debug.log('Connected to MongoDB');
});
mongoose.connection.once('connected', () => {
    Debug.init(vars.debug);
    Scheduler.init();
    Api.init();
});

app.get('/totalRepos', (req, res) => {
    ghRq.getCount((err, length) => {
        res.json({
            "count": length
        });
    });
});

app.get('/apiKeys', (req, res) => {
    let keys = []
    Api.getKeys().forEach(key => {
        keys.push(key.toJSON());
    })
    res.json({
        "keys": keys
    })
})
app.get('/schedulers', (req, res) => {
    let schedulers = []
    Scheduler.getSchedulers().forEach(scheduler => {
        schedulers.push(scheduler.toJSON());
    })
    res.json({
        "schedulers": schedulers
    })
})
app.post('/removeKey', (req, res) => {
    Api.remove(req.body.key);
})

app.listen(PORT, (err) => {
    if (err) throw err; 
    Debug.log('Server started on port ' + PORT);
});


function auth(req, res, next) {
    if(Api.auth(req.headers.key, req.headers.uuid)) {
        next();
    } else {
        Debug.log("Invalid request");
        res.json({
            "Err": "Api Key or UUID could not be authenticated"
        });
    }
}