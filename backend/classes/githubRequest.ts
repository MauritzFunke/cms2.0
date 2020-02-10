import * as request from 'request';
import debug from 'debug';
const link = "https://api.github.com/users/";


export default class githubRequest{
    private username: String


    constructor(username: String) {
        this.username=username;
        debug.log('Created a Github request for '+this.username);
    }

    public getRepos(callback) {
        debug.log('Getting the Repos from the user ' + this.username);
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
        debug.log('Getting the owned Repos from the user ' + un);
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
                        debug.log('Adding ' + repo.name);
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
