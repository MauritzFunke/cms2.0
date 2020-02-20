import Debug from './debug';
import mongoose from 'mongoose';
import * as SchedulerModel from '../models/Scheduler'
import SchedulerSchema from '../models/Scheduler'
import * as schedule from 'node-schedule';
import * as events from 'events';
import gitHubRequest from './githubRequest';


export default class Scheduler implements SchedulerModel.ISchedulerSchema {
    private static initEvent = new events.EventEmitter();
    private static Schedulers: Array<Scheduler> = [];
    private time: Number;
    private name: String;
    private description: String;
    private func: String;
    private args: Array<String>;

    constructor(time: Number, name: String, description: String, func: String, args: Array<String>) {
        Debug.log('Creating new Scheduler');
        this.time = time;
        this.name = name;
        this.description = description;
        this.func = func;
        this.args = args;
        this.save();
        Scheduler.getSchedulers().push(this);
        this.execute();
    }
    private execute() {
        schedule.scheduleJob(this.time + ' * * * *', () => {
            switch (this.func) {
                case "syncGH()":
                    this.syncGH();
                    break;
        
            default:
                break;
        }
        });
    } 
    private syncGH() {
        var ghrq = new gitHubRequest(this.args[0]);
        ghrq.updateRepos();
    }
    private save() {
        const SchedulerSync = new SchedulerSchema({
            time: this.time,
            name: this.name,
            description: this.description,
            func: this.func,
            args: this.args
        });
        SchedulerSync.save();
        Debug.log('Saving new Scheduler');
    }
    public getTime(): Number {
        return this.time;
    }
    public getName(): String {
        return this.name;
    }
    public getDescription(): String {
        return this.description;
    }
    public getFunc(): String {
        return this.func;
    }
    public getArgs(): Array<String> {
        return this.args
    }
    public toJSON() {
        var parsed = {
            "time": this.time,
            "name": this.name,
            "description": this.description,
            "func": this.func,
            "args": this.args
        }
        return parsed;
    }
    public static init() {
        SchedulerSchema.find({}, (err, Schedulers) => {
            SchedulerSchema.deleteMany({}, (err) => {
                if(err) throw err;
                Debug.log("Deleted all schedulers");
            }).then(() => {
                Debug.log("Syncing all schedulers");
                Schedulers.forEach(scheduler => {
                    new Scheduler(scheduler.time, scheduler.name, scheduler.description, scheduler.func, scheduler.args);
                });
                this.initEvent.emit('init');
            });
        });
    }
    public static getInitEvent() {
        return this.initEvent;
    }
    public static getSchedulers() {
        return this.Schedulers;
    }
}
