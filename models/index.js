// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const { route } = require('../routes/api/category-routes');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
})
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
 
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: 'product_id',
  through: ProductTag
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: 'tag_id',
  through: ProductTag
})

  // delete a category by its `id` value
 deleteCategoryById = (req, res) => {
   Category.destroy({
     where: {
       id: req.params.id
     }
   })
     .then(categoryData => {
       if (!categoryData) {
         res.status(404).json({ message: 'No category found with this id!' });
         return;
       }
       res.json(categoryData);
     })
     .catch(err => {
       console.log(err);
       res.status(500).json(err);
     });
   };

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
