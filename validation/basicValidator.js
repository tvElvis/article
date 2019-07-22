import _ from 'lodash';

import validator from '../component/validator';
import categoryWrite from '../model/write/category';

class BasicValidator {
  constructor(modelWrite) {
    this.modelWrite = modelWrite;
  };

  async findResourceById(_id, resourceType, model = this.modelWrite) {
    const resource = await model.findById(_id);

    if (!resource) {
      throw ([
        {
          param: '_id',
          message: `${resourceType} not found`,
        },
      ]);
    }

    return resource;
  }

  validateIncomingData(data, validateSchema) {
    const errorList = validator.check(data, validateSchema);

    if (errorList.length) {
      throw (errorList);
    }
  }

  async create(body) {
    const validateSchema = {
      name: {
        notEmpty: {
          param: 'name',
          message: 'Name is required',
        },
      },
      categoryId: {
        isMongoId: {
          param: 'categoryId',
          message: 'Valid category id required',
        },
      },
    };

    this.validateIncomingData(body, validateSchema);

    await this.findResourceById(body.categoryId, 'category', categoryWrite);

    return _.pick(body, this.params);
  };

  async getOne(_id) {
    const dataToValidate = {
      _id,
    };

    const validateSchema = {
      _id: {
        isMongoId: {
          param: '_id',
          message: 'Valid id required',
        },
      },
    };

    this.validateIncomingData(dataToValidate, validateSchema);

    const resource = await this.findResourceById(_id, this.resourceType);

    return resource;
  }

  async update(_id, body) {
    const dataToValidate = {
      _id: _id,
      name: body.name,
      categoryId: body.categoryId,
      text: body.text,
    };

    const validateSchema = {
      _id: {
        isMongoId: {
          param: '_id',
          message: 'Valid id required',
        },
      },
    };

    if (!_.isUndefined(body.name)) {
      validateSchema.name = {
        notEmpty: {
          param:'name',
          message: 'Name is required',
        },
      }
    }

    if (!_.isUndefined(body.categoryId)) {
      validateSchema.categoryId = {
        isMongoId: {
          param:'categoryId',
          message: 'Valid category id required',
        },
      }
    }

    this.validateIncomingData(dataToValidate, validateSchema);

    await this.findResourceById(_id, this.resourceType);

    if (!_.isUndefined(body.categoryId)) {
      await this.findResourceById(body.categoryId, 'category', categoryWrite);
    }

    return _.pick(body, this.params);
  }

  async delete(_id) {
    const dataToValidate = {
      _id,
    };

    const validateSchema = {
      _id: {
        isMongoId: {
          param: '_id',
          message: 'Valid id required',
        },
      },
    };

    this.validateIncomingData(dataToValidate, validateSchema);

    await this.findResourceById(_id, this.resourceType);

    return _id;
  }
}

export default BasicValidator;