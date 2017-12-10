import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category_name: String
});

const Product = mongoose.model('Product', productSchema);

export default Product;
