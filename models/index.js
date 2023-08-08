// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const { route } = require('../routes/api/category-routes');

// Products belongsTo Category

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
 
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Category, {
  foreignKey: 'product_id',
  through: ProductTag
})

// Tags belongToMany Products (through ProductTag)
Category.belongsToMany(Tag, {
  foreignKey: 'category_id',
  through: ProductTag
})

  // delete a category by its `id` value
 
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
