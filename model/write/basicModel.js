import _ from 'lodash';
import db from '../../component/db';


class BasicWrite {
  constructor(model) {
    this.model = db.model('write', model);
  }

  create(body) {
    return this.model.insertRow({
      data: _.pick(body, this.params),
    });
  }

  findById(_id) {
    return this.model.findRow({
      query: {
        _id,
        isDeleted: false,
      },
    });
  }

  update(_id, body) {
    const data = _.assignIn({
      updatedAt: new Date(),
    }, _.pick(body, this.params));

    return this.model.updateRow({
      query: {
        _id,
        isDeleted: false,
      },
      data,
    });
  }

  delete(_id) {
    return this.model.updateRow({
      query: {
        _id,
        isDeleted: false,
      },
      data: {        
        updatedAt: new Date(),
        isDeleted: true,
      },
    });
  }

  findAll() {
    return this.model.findRows({
      query: {
        isDeleted: false,
      },
    });
  }

}

export default BasicWrite;