import * as request from 'request';
import * as mongoose from 'mongoose';
import * as fs from 'fs';
import * as schedule from 'node-schedule';
import debug from './classes/debug';
import githubRequest from './classes/githubRequest';
import RepoSchema from './models/Repo';

const keys = require('./config/keys');
const vars = require('./config/vars');

debug.init(vars.debug);

var ghreq = new githubRequest(vars.username);


mongoose.connect('mongodb://' + keys.mongo.user + ':'+keys.mongo.pwd +'@localhost:27017/website', err => {
    if (err) throw err;
    debug.log('Connected to MongoDB');
});

var j = schedule.scheduleJob('0 * * * *', function(){
    ghreq.getOwnedRepos((err, body) => {
        if(err) throw err;
        RepoSchema.deleteMany({}, (err) => {
            if (err) throw err;
            debug.log('Deleted all Databases');
        });
        body.forEach(repo => {
            const RepoSync = new RepoSchema({
                name: repo.name,
                html_url: repo.html_url,
                description: repo.description,
                created_at: repo.created_at,
                updated_at: repo.updated_at,
                language: repo.language
            })
            console.log(RepoSync);
            RepoSync.save();
        });
    });
});
