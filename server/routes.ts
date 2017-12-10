import * as express from 'express';

import ProductCtrl from './controllers/product';
import CategoryCtrl from './controllers/category';
import UserCtrl from './controllers/user';
import Product from './models/product';
import User from './models/user';
import Category from './models/category';

export default function setRoutes(app) {

  const router = express.Router();

  const productCtrl = new ProductCtrl();
  const userCtrl = new UserCtrl();
  const categoryCtrl = new CategoryCtrl();

  // Products
  router.route('/products').get(productCtrl.getAll);
  router.route('/products/count').get(productCtrl.count);
  router.route('/product').post(productCtrl.insert);
  router.route('/product/:id').get(productCtrl.get);
  router.route('/product/:id').put(productCtrl.update);
  router.route('/product/:id').delete(productCtrl.delete);

  // Categories
  router.route('/categories').get(categoryCtrl.getAll);
  router.route('/categories/count').get(categoryCtrl.count);
  router.route('/category').post(categoryCtrl.insert);
  router.route('/category/:id').get(categoryCtrl.get);
  router.route('/category/:id').put(categoryCtrl.update);
  router.route('/category/:id').delete(categoryCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);
  
  app.use('/api', router);

}
