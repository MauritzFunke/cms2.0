import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export interface IRepoSchema extends Document {
    name: String,
    html_url: String,
    description: String,
    created_at: Date,
    updated_at: Date,
    language: String
}


const RepoSchema: Schema = new Schema({
  name: { type: String, required: true },
  html_url: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  language: { type: String, required: true }
});

export default mongoose.model<IRepoSchema>('Repo', RepoSchema);