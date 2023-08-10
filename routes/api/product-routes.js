const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint


router.get('/', async (req, res) => {
  console.log ( 'get all products')
  try {
    const driverData = await Product.findAll({
      include: [ Category , { model: Tag, through: ProductTag}],
    });
    //console.log (driverData)
    res.status(200).json(driverData);
  } catch (err) {
    //console.log (err)
    res.status(500).json(err);
  }
  

});

// get one product
router.get('/:id', async (req, res) => {

  try {
const productData = await Product.findByPk(req.params.id, {
  include: [{ model: Category, model: Tag, through: ProductTag}],
})
res.status(200).json(productData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }

});

// create new product
router.post('/', async (req, res) => {
  // req.body should look like this...
  // {
  //   product_name: "shoes",
  //   price: 200.00,
  //   stock: 3,
  //   tagIds: [1, 2, 3, 4],
  //   category_id: 1
  // };
  
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // Update product data
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      // Create filtered list of new tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    const updatedProduct = await Product.findByPk(req.params.id);
    return res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});


router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  try {
    Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end();
  } catch (err) {
    res.status(500).json(error);
    
  }
});

module.exports = router;
