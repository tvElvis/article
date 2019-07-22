import articleWrite from '../model/write/article';
import articleRead from '../model/read/article';


import BasicAction from './basicAction';

class ArticleAction extends BasicAction {
  constructor() {
    super(articleWrite);
    this.modelRead = articleRead;
    this.params = ['_id', 'name', 'categoryId', 'text', 'description'];
    this.entity = 'article';
  }
 
  getByCategory(_id) {
    return this.modelWrite.findByCategoryId(_id);
  }
}

export default new ArticleAction();