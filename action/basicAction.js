import _ from 'lodash';

import eventBus from '../component/eventBus';

class BasicAction {
  constructor(modelWrite) {
    this.modelWrite = modelWrite;
  }

  async create(body) {
    const resource = await this.modelWrite.create(body);

    //...Read update logic

    return resource;
  }

  getAll() {
    return this.modelWrite.findAll();
  }

  getAllRead() {
    return this.modelRead.findAll();
  }

  getOne(_id) {
    return this.modelWrite.findById(_id);
  }

  getOneRead(_id) {
    return this.modelRead.findById(_id);
  }

  async update(_id, body) {
    const resource = await this.modelWrite.update(_id, body)

    //...Read update logic

    return resource;
  }

  async delete(_id) {
    const resource = await this.modelWrite.delete(_id);

    //...Read update logic

    return resource;
  }

}

export default BasicAction;