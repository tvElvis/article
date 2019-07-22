import BasicWrite from './basicModel';

class ResourceModel extends BasicWrite {
  constructor(modelWrite){
    super(modelWrite);
  }

  updateCategoryId(categoryId, newCategoryId) {
    return this.model.updateRows({
      query: {
        categoryId,
        isDeleted: false,
      },
      data: {        
        categoryId: newCategoryId,
        updatedAt: new Date(),
      },
    });
  }

  deleteByCategoryId(categoryId) {
    return this.model.updateRows({
      query: {
        categoryId,
        isDeleted: false,
      },
      data: {        
        updatedAt: new Date(),
        isDeleted: true,
      },
    });
  }

  findByCategoryId(categoryId) {
    return this.model.findRows({
      query: {
        categoryId,
        isDeleted: false,
      },
    });
  }
}

export default ResourceModel;