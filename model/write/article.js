import ResourceModel from './resourceModel';

class ArticleWrite extends ResourceModel {
  constructor() {
    super('article');
    this.params = ['name', 'categoryId', 'text', 'description'];
  }

}

export default new ArticleWrite();