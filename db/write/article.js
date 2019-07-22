import { Schema } from 'mongoose'
import * as _ from 'lodash';

const standartField = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDeleted: { type : Boolean, default : false },
};

export default new Schema(
  _.assignIn(
    _.cloneDeep(standartField),
    {
      name: { type: String, required: true },
      categoryId: { type: Schema.Types.ObjectId, required: true },
      text: { type: String, default: null },
      description: { type: String, default: null },
    }
  )
);