import * as express from 'express';
import * as ejs from 'ejs';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as partials from 'express-partials';
import * as request from 'request';
import Debug from './classes/Debug';


const config = require('./config/vars');
const keys = require('./config/keys');


const PORT = process.env.PORT || config.PORT;

const app = express();


app.set('view engine', 'ejs');
app.use(partials());
app.use(session({
    secret: keys.secrets.session,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));
app.use(cookieParser(keys.secrets.cookie))
app.use(bodyParser.json());
app.use('/static/', express.static('./static/'));
app.use(auth);


app.get('/', (req, res) => {
    getBackend("totalRepos", (err, response) => {
        res.render("sites/index", {
            repos: response
        });
    });

});

app.get('/tasks', (req, res) => {
    getBackend("schedulers", (err, response) => {
        var parsed = JSON.parse(response).schedulers;
        res.render('sites/tasks', {
            "tasks": parsed
        });
    });
});
app.get('/api', (req,res) => {
    getBackend("apiKeys", (err, response) => {
        var parsed = JSON.parse(response).keys;
        res.render('sites/api', {
            "keys": parsed
        });
    })
})
app.get('/removeTask', (req, res) => {
    postBackend('removeTask', {'id': req.query.id}, (err, response) => {
        if (err) throw err;
    })
    res.redirect('/tasks');
})
app.get('/addTask', (req, res) => {
    postBackend('addTask', {'name': req.query.name, 'description': req.query.description, 'time': req.query.time, 'func': req.query.func, 'args': req.query.args}, (err, response) => {
        res.redirect('tasks');
    })
})
app.get('/removeKey', (req, res) => {
    postBackend('removeKey', {'_id': req.query._id}, (err, response) => {
        if (err) throw err;
    })
    res.redirect('/api');
})
app.get('/addKey', (req, res) => {
    postBackend('addKey', {'name': req.query.name, 'description': req.query.description, 'type': req.query.type}, (err, response) => {
        if (err) throw err;
    })
    res.redirect('api');
})
function getBackend(link: String, callback: Function) {
    const opt = {
       url: 'http://localhost:3002/' + link,
       headers: {
        "json": true,
        "key": keys.api.key,
        "UUID": keys.api.UUID
       }
    }
    request.get(opt, (err, body, response) => {
        if (err) Debug.log(err);
        return callback(err, response);
    })
}

function postBackend(link: String, data, callback: Function) {
    const opt = {
       url: 'http://localhost:3002/' + link,
       headers: {
        "key": keys.api.key,
        "UUID": keys.api.UUID
       },
       body: data,
       json: true
    }
    request.post(opt, (err, body, response) => {
        if (err) Debug.log(err);
        return callback(err, response);
    })
}
function auth(req, res, next) {
    if(typeof req.session.user==='undefined') {
        Debug.log("NoUser");
        next()
    } else {
        next();
    }
}







app.listen(PORT, (err) => {
    if (err) throw err;
    Debug.log('Server started on Port ' + PORT)
})