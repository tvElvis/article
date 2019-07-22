import articleWrite from '../model/write/article';
import BasicValidator from './basicValidator';

class ArticleValidate extends BasicValidator {
  constructor() {
    super(articleWrite);
    this.params = ['name', 'categoryId', 'text', 'description'];
    this.resourceType = 'article';
  }

}

export default new ArticleValidate();