const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');



router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product , through: ProductTag }],
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product , through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }


});

router.post('/', async (req, res) => {
 
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  
  try {
    const updated = await Tag.update(req.body, {
      where: { id: req.params.id }
    })
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    await Tag.destroy({
      where: { id: req.params.id }
    })
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
