import Debug from './debug';
import * as ApiModel from '../models/Api'
import ApiSchema from '../models/Api'
import * as apigen from 'uuid-apikey';



export default class Api implements ApiModel.IApiSchema {
    private static isInit: Boolean = false;
    private static keys: Array<Api> = [];
    private name: String;
    private description: String;
    private key: String;
    private UUID: String
    private count: number;

    constructor(name: String, description: String);
    constructor(name: String, description: String, key?: String);
    constructor(name: String, description: String, key?: String, count?: number);

    constructor(name: String, description: String, key?: String, count?: number) {
        this.name = name;
        this.description = description;
        Debug.log("Creating a new API Key");
        if(key) {
            this.key = key;
            this.UUID = apigen.toUUID(key);    
        } else {
            var newKey = apigen.create();
            this.key = newKey.apiKey;
            this.UUID = newKey.uuid;
        }
        if(count) {
            this.count = count;
        } else {
            this.count = 0;
        }
        this.save();
    }


    private save() {
        Api.keys.forEach((apiKey, i) => {
            if(apiKey.key === this.key) {
                Api.keys.splice(i,1);
                ApiSchema.findOneAndDelete({ key: this.key}).then((del) => {
                });                
            }
        })
        const Synckey = new ApiSchema({
            name: this.name,
            description: this.description,
            key: this.key,
            UUID: this.UUID,
            count: this.count
        });
        Synckey.save();
        Api.keys.push(this);
    }
    getName(): String {
        return this.name;
    }
    getDescription(): String {
        return this.description;
    }
    getKey(): String {
        return this.key;
    }
    getUUID(): String {
        return this.UUID;
    }
    getCount(): number {
        return this.count;
    }
    add(): void {
        this.count++;
        this.save();
    }
    public static init() {    
        ApiSchema.find({}, (err, Apis) => {
                ApiSchema.deleteMany({}, (err) => {
                    if(err) throw err;
                    Debug.log("Deleted all Apis");
                }).then(() => {
                    Debug.log("Syncing all Apis");
                    Apis.forEach(api => {
                        Api.keys = [];
                        new Api(api.name, api.description, api.key, api.count);
                    });
                });
            }); 
            this.isInit = true;
    }
    toJSON() {
        var parsed = {
            "name": this.name,
            "description": this.description,
            "key": this.key,
            "UUID": this.UUID,
            "count": this.count
        }
        return parsed;
    }
    static remove(uuid: String) {
        ApiSchema.deleteMany({UUID: uuid}, (err) => {
            if (err) throw err;
        }).then((doc) => {
            console.log(doc);
            Api.init();
        })
    }
    static getKeys(): Array<Api> {
        return Api.keys;
    }
    static auth(key: String, UUID: String): Boolean {
        var res = false;
        if(apigen.isAPIKey(key)) {
        if(!(apigen.toUUID(key) === UUID)) res = false;
        Api.getKeys().forEach((apiKey) => {
            if(apiKey.getKey() === key) {
                apiKey.add();
                res = true;
            } else {
                res = false;
            }
        });
    }
        return res;
    }
}
