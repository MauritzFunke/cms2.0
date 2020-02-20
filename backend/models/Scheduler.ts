import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export interface ISchedulerSchema {
    getTime(): Number,
    getName(): String,
    getDescription(): String,
    getFunc(): String,
    getArgs(): Array<String>
}


const SchedulerSchema: Schema = new Schema({
  time: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  func: {type: String, required: true},
  args: {type: Array, required: true}
});

export default mongoose.model<ISchedulerSchema>('Scheduler', SchedulerSchema); 