import koaRouter from 'koa-router';

import middlewareWrapper from '../component/middlewareWrapper';
import articleAction from '../action/article';
import categoryAction from '../action/category';
import articleValidate from '../validator/article';
import categoryValidate from '../validator/category';

/**
  * @apiDefine articleObject
  * @apiSuccess  {String} _id Article id
  * @apiSuccess  {String} categoryId Article category id
  * @apiSuccess  {String} name Article name can not be empty
  * @apiSuccess  {String} text Text. Allowed null as a value 
  * @apiSuccess  {String} description Description. Allowed null as a value
  * @apiSuccess  {Boolean} isDeleted Is article deleted
  * @apiSuccess  {String} createdAt Article create date
  * @apiSuccess  {String} updatedAt Article update date
*/

/**
  * @apiDefine invalidIdError
  * @apiError (Id Error) InvalidId { param: "_id", message: "Valid id required" }
*/

/**
  * @apiDefine articleNotFoundError
  * @apiError (Id Error) IdNotFound { param: "_id", message: "article not found" }
*/

/**
  * @apiDefine invalidNameError
  * @apiError (Name Error) InvalidName { param: "name", message: "Name is required" }
*/

/**
  * @apiDefine invalidCategoryIdError
  * @apiError (Category id Error) InvalidParent { param: "categoryId", message: "Valid category id required" }
*/

/**
  * @apiDefine categoryIdNotFoundError
  * @apiError (Category id Error) ParentNotFound { param: "categoryId", message: "category not found" }
*/

export let router = koaRouter({
  prefix: '/api/v1/articles',
});

/**

  * @apiName Create
  * @api {POST} /api/v1/articles Create

  * @apiVersion 0.0.1
 
  * @apiGroup Article
 
  * @apiHeader {String} Content-Type=application/json Content-Type
 
  * @apiParam {String} name Name
  * @apiParam {ObjectId} categoryId Article category id
  * @apiParam {String} [text=null] Text. Allowed null as a value
  * @apiParam {String} [description=null] Description. Allowed null as a value

  * @apiExample {curl} Example usage:
  *     curl '.../api/v1/articles'
  *      -H "Content-Type: application/json"
  *      -X POST
  *      -d '{"name":"Cheese sandwich","categoryId":"5c499a59beff35368c511b73"}'
  
  * @apiSuccessExample {json} Success-Response: 
  *{
  *  "isDeleted": false,
  *  "text": "test",
  *  "description": "test",
  *  "_id": "5c4b045b1575fe5512b87d98",
  *  "name": "test",
  *  "categoryId": "5c499a59beff35368c511b73",
  *  "createdAt": "2019-01-25T12:43:07.610Z",
  *  "updatedAt": "2019-01-25T12:43:07.611Z",
  *}

  * @apiUse articleObject
  
  * @apiErrorExample {json} Error-Response:
  * [{"param":"categoryId","message":"Category id not valid"}] 

  * @apiUse invalidNameError
  * @apiUse invalidCategoryIdError
  * @apiUse categoryIdNotFoundError
 */

router.post('/', async (req) => {
  await middlewareWrapper.wrape(req, null, async () => {
    let regData = await articleValidate.create(req.request.body);
    return await articleAction.create(regData);
  });
});

/**

  * @apiName Get related categories
  * @api {Get} /api/v1/articles/related/:id Get related categories

  * @apiVersion 0.0.1
 
  * @apiGroup Article
 
  * @apiHeader {String} Content-Type=application/json Content-Type
 
  * @apiExample {curl} Example usage:
  *     curl '.../api/v1/categories/related/5c4b045b1575fe5512b87d98'
  *      -H "Content-Type: application/json"
  *      -X Get
  
  * @apiParam {String} [id] Id of article to find related categories

  * @apiSuccessExample {json} Success-Response: 
  *[
  *  {
  *    "_id": "5c4ab94edda88417f1bafe63",
  *    "isDeleted": false,
  *    "parent": null,
  *    "name": "test",
  *    "createdAt": "2019-01-25T07:22:54.003Z",
  *    "updatedAt": "2019-01-25T11:31:27.754Z"
  *  },
  *  {
  *    "_id": "5c4aba95dda88417f1bafe64",
  *    "isDeleted": false,
  *    "parent": "5c4ab94edda88417f1bafe63",
  *    "name": "test",
  *    "createdAt": "2019-01-25T07:28:21.836Z",
  *    "updatedAt": "2019-01-25T07:28:21.836Z"
  *  }
  *]
  
  * @apiSuccess  {Object[]} . Array of related categories
  * @apiSuccess  {String} ._id Category id
  * @apiSuccess  {String} .parent Parent id
  * @apiSuccess  {Boolean} .isDeleted Is article deleted
  * @apiSuccess  {String} .createdAt Article create date
  * @apiSuccess  {String} .updatedAt Article update date
  
  * @apiErrorExample {json} Error-Response:
  *  [{"param":"_id","message":"Valid id required"}]

  * @apiUse invalidIdError
  * @apiUse articleNotFoundError
*/

router.get('/related/:id', async (req) => {
  await middlewareWrapper.wrape(req, null, async () => {
    let regData = await articleValidate.getOne(req.params.id);
    return await categoryAction.getConnectedCategories(regData.categoryId);
  });
});

/**

  * @apiName Get articles by category
  * @api {Get} /api/v1/articles/category/:id Get articles by category

  * @apiVersion 0.0.1
 
  * @apiGroup Article
 
  * @apiHeader {String} Content-Type=application/json Content-Type

  * @apiExample {curl} Example usage:
  *     curl '.../api/v1/articles/category/5c499a59beff35368c511b73'
  *      -H "Content-Type: application/json"
  *      -X Get
  
  * @apiParam {String} [id] Id of categoriy to find articles

  * @apiSuccessExample {json} Success-Response: 
  *[
  *  {
  *    "_id": "5c4b045b1575fe5512b87d98",
  *    "isDeleted": false,
  *    "text": "test",
  *    "description": "Test description ",
  *    "name": "test",
  *    "categoryId": "5c499a59beff35368c511b73",
  *    "createdAt": "2019-01-25T12:43:07.610Z",
  *    "updatedAt": "2019-01-25T12:43:07.611Z"
  *  },
  *  {
  *    "_id": "5c4b1cf0083cf5664a89a214",
  *    "isDeleted": false,
  *    "text": "test",
  *    "description": "Test description ",
  *    "name": "test",
  *    "categoryId": "5c499a59beff35368c511b73",
  *    "createdAt": "2019-01-25T14:28:00.020Z",
  *    "updatedAt": "2019-01-25T14:28:00.020Z"
  *  }
  *]
  
  * @apiSuccess  {Object[]} . Array of articles by category
  * @apiSuccess  {String} ._id Category id
  * @apiSuccess  {String} .categoryId Parent id
  * @apiSuccess  {String} .text Text. Allowed null as a value
  * @apiSuccess  {String} .description Description. Allowed null as a value
  * @apiSuccess  {Boolean} .isDeleted Is article deleted
  * @apiSuccess  {String} .createdAt Article create date
  * @apiSuccess  {String} .updatedAt Article update date
  
  * @apiErrorExample {json} Error-Response:
  *  [{"param":"_id","message":"Valid id required"}]

  * @apiUse invalidIdError
  * @apiUse categoryIdNotFoundError
*/


router.get('/category/:id', async (req) => {
  await middlewareWrapper.wrape(req, null, async () => {
    let regData = await categoryValidate.getOne(req.params.id);
    return await articleAction.getByCategory(regData._id);
  });
});

/**

  * @apiName Get one
  * @api {Get} /api/v1/articles/:id Get one

  * @apiVersion 0.0.1
 
  * @apiGroup Article
 
  * @apiHeader {String} Content-Type=application/json Content-Type
 
  * @apiExample {curl} Example usage:
  *     curl '.../api/v1/articles/5c4b045b1575fe5512b87d98'
  *      -H "Content-Type: application/json"
  *      -X Get
  
  * @apiParam {String} [id] Id of article to find

  * @apiSuccessExample {json} Success-Response: 
  *{
  *  "_id": "5c4b045b1575fe5512b87d98",
  *  "isDeleted": false,
  *  "text": "test",
  *  "description": "Test description",
  *  "name": "test",
  *  "categoryId": "5c4aba95dda88417f1bafe64",
  *  "createdAt": "2019-01-25T12:43:07.610Z",
  *  "updatedAt": "2019-01-25T12:43:07.611Z"
  *}
  
  * @apiUse articleObject
  
  * @apiErrorExample {json} Error-Response:
  *  [{"param":"_id","message":"Valid id required"}]

  * @apiUse invalidIdError
  * @apiUse articleNotFoundError
*/

router.get('/:id', async (req) => {
  await middlewareWrapper.wrape(req, null, async () => {
    let regData = await articleValidate.getOne(req.params.id);
    return await articleAction.getOne(regData._id);
  });
});

/**

  * @apiName Get all
  * @api {Get} /api/v1/articles Get all

  * @apiVersion 0.0.1
 
  * @apiGroup Article
 
  * @apiHeader {String} Content-Type=application/json Content-Type

  * @apiExample {curl} Example usage:
  *     curl '.../api/v1/articles'
  *      -H "Content-Type: application/json"
  *      -X Get
  
  * @apiSuccessExample {json} Success-Response: 
  *[
  *  {
  *    "_id": "5c4b045b1575fe5512b87d98",
  *    "isDeleted": false,
  *    "text": "Test text",
  *    "description": "Test description ",
  *    "name": "Cheese sandwich",
  *    "categoryId": "5c4aba95dda88417f1bafe64",
  *    "createdAt": "2019-01-25T12:43:07.610Z",
  *    "updatedAt": "2019-01-25T12:43:07.611Z"
  *  },
  *  {
  *    "_id": "5c4b1cf0083cf5664a89a214",
  *    "isDeleted": false,
  *    "text": "Test text",
  *    "description": "Test description ",
  *    "name": "Burger",
  *    "categoryId": "5c499a59beff35368c511b73",
  *    "createdAt": "2019-01-25T14:28:00.020Z",
  *    "updatedAt": "2019-01-25T14:28:00.020Z"
  *  }
  *]
  
  * @apiUse articleObject
  * @apiSuccess  {Object[]} . Array of articles
  * @apiSuccess  {String} ._id Article id
  * @apiSuccess  {String} .categoryId Article category id
  * @apiSuccess  {String} .name Article name can not be empty
  * @apiSuccess  {String} .text Text. Allowed null as a value
  * @apiSuccess  {String} .description Description. Allowed null as a value
  * @apiSuccess  {Boolean} .isDeleted Is article deleted
  * @apiSuccess  {String} .createdAt Article create date
  * @apiSuccess  {String} .updatedAt Article update date  
*/

router.get('/', async (req) => {
  await middlewareWrapper.wrape(req, null, async () => {
    return await articleAction.getAll();
  });
});

/**

  * @apiName Update
  * @api {Put} /api/v1/articles/:id Update

  * @apiVersion 0.0.1
 
  * @apiGroup Article
 
  * @apiHeader {String} Content-Type=application/json Content-Type
 
  * @apiParam {String} id Id of article to update
  * @apiParam {String} [name] Name
  * @apiParam {String} [categoryId] Article category id
  * @apiParam {String} [text] Text. Allowed null as a value
  * @apiParam {String} [description] Description. Allowed null as a value

  * @apiExample {curl} Example usage:
  *     curl '.../api/v1/adrticles/5c4b045b1575fe5512b87d98'
  *      -H "Content-Type: application/json"
  *      -X Put
  *      -d '{"name":"Hot dog"}'
  
  * @apiSuccessExample {json} Success-Response: 
  *{
  *  "isDeleted": false,
  *  "text": "Test text",
  *  "description": "Test description ",
  *  "_id": "5c4b045b1575fe5512b87d98",
  *  "name": "Hot dog",
  *  "categoryId": "5c4ab94edda88417f1bafe63",
  *  "createdAt": "2019-01-25T12:43:07.610Z",
  *  "updatedAt": "2019-01-25T15:33:07.008Z"
  *}
  
  * @apiUse articleObject

  * @apiErrorExample {json} Error-Response:
  *  [{"param":"_id","message":"Valid id required"}]
  
  * @apiUse invalidIdError
  * @apiUse articleNotFoundError
  * @apiUse invalidCategoryIdError
  * @apiUse categoryIdNotFoundError
  * @apiUse invalidNameError
*/

router.put('/:id', async (req) => {
  await middlewareWrapper.wrape(req, null, async () => {
    let regData = await articleValidate.update(req.params.id, req.request.body);
    return await articleAction.update(req.params.id, regData);
  });
});

/**

  * @apiName Delete
  * @api {Delete} /api/v1/articles/:id Delete

  * @apiVersion 0.0.1
 
  * @apiGroup Article
 
  * @apiHeader {String} Content-Type=application/json Content-Type
 
  * @apiExample {curl} Example usage:
  *     curl '.../api/v1/categories/5c499a59beff35368c511b73'
  *      -H "Content-Type: application/json"
  *      -X Delete
  
  * @apiParam {String} id Id of article to delete

  * @apiSuccessExample {json} Success-Response: 
  *{
  *  "isDeleted": true,
  *  "parent": null,
  *  "_id": "5c499a59beff35368c511b73",
  *  "name": "test",
  *  "text": "Test text",
  *  "description": "Test description ",
  *  "createdAt": "2019-01-24T10:58:33.743Z",
  *  "updatedAt": "2019-01-25T11:31:27.764Z"
  *}
  
  * @apiUse articleObject

  * @apiErrorExample {json} Error-Response:
  *  [{"param":"_id","message":"Valid id required"}]
  
  * @apiUse invalidIdError
  * @apiUse articleNotFoundError
*/

router.delete('/:id', async (req) => {
  await middlewareWrapper.wrape(req, null, async () => {
    let regData = await articleValidate.delete(req.params.id);
    return await articleAction.delete(regData);
  });
});

