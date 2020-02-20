import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export interface IApiSchema {
    getName(): String,
    getDescription(): String,
    getKey(): String,
    getUUID(): String,
    getCount(): Number
}


const ApiSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  key: {type: String, required: true},
  UUID: {type: String, required: true},
  count: {type: Number, required: true, default: 0}
});
 
export default mongoose.model<IApiSchema>('Api', ApiSchema);