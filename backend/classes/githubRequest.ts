import * as request from 'request';
import Debug from './debug';
const link = "https://api.github.com/users/";
import RepoSchema from '../models/Repo';


export default class githubRequest{
    private username: String


    constructor(username: String) {
        this.username=username;
        Debug.log('Created a Github request for '+this.username);
    }
    public updateRepos() {
      this.getOwnedRepos((err, body) => {
        if(err) throw err;
        RepoSchema.deleteMany({}, (err) => {
            if (err) throw err;
            Debug.log('Deleted all Databases');
        }).then(() => {
            body.forEach(repo => {
                const RepoSync = new RepoSchema({
                    name: repo.name,
                    html_url: repo.html_url,
                    description: repo.description,
                    created_at: repo.created_at,
                    updated_at: repo.updated_at,
                    language: repo.language
                })
                Debug.log(RepoSync);
                RepoSync.save();
            });
        })
    });
    }
    public getCount(callback) {
      this.getOwnedRepos((err, cb) => {
        return callback(err, cb.length);
      })
    }
    public getRepos(callback) {
        Debug.log('Getting the Repos from the user ' + this.username);
        var options = {
            url: link + this.username + '/repos',
            headers: {
              'User-Agent': 'Awsome backend for mauritzfunke.de'
            }
        };
        request(options, function(err, res, body) {
            if (err)
              return callback(err);
            try {
              callback(null, JSON.parse(body));
            } catch (ex) {
              callback(ex);
            }
        });
    }
    public getOwnedRepos(callback) {
      var un = this.username;
        Debug.log('Getting the owned Repos from the user ' + un);
        var options = {
            url: link + un + '/repos?type=owner',
            headers: {
              'User-Agent': 'Awsome backend for mauritzfunke.de'
            }
        };
        request(options, function(err, res, body) {
            if (err)
              return callback(err);
            try {
                let filtered = [];
                let parsed = JSON.parse(body);
                parsed.forEach(repo => {
                    if(!repo.fork) {
                        filtered.push(repo)
                    }
                });
                callback(null, filtered);
            } catch (ex) {
                callback(ex);
            }
        });
    }
}
