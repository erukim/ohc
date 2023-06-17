import { Schema, model, Model } from 'mongoose';
import { Example } from '../../../typings/database';

const ExampleSchema: Schema<Example> = new Schema(
  {
    serverid: String,
  },
  { collection: 'Example' },
);

const Example: Model<Example> = model('Example', ExampleSchema, 'Example');

export default Example;
