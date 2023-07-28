const router = require('express').Router();
const { response } = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    const cateData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(cateData);
  } catch (err) {
    console.log(err),
      res.status(500).json({ message: 'Internal server error!' + err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const cateData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    if (!cateData) {
      res.status(404).json({ message: 'No input id found!' }); return;
    }
    res.status(200).json(cateData);
  } catch (err) {
    console.log(err),
      res.status(500).json({ message: 'Internal server error!' + err });
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new category
    const newCate = await Category.create(req.body);
    res.status(201).json(newCate);
    console.log("success to add a new category: ", newCate);
  } catch (err) {
    console.log(err),
      res.status(500).json({ message: 'Internal server error!' + err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const updateCate = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updateCate[0] === 0) {
      res.status(404).json({ message: 'Can not find category with your input id!' }); return;
    }
    res.status(200).json({ message: 'Category updated!' });
  } catch (err) {
    console.log(err),
      res.status(500).json({ message: 'Internal server error!' + err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const deleteCate = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!deleteCate) {
      res.status(404).json({ message: 'Can not find category with your input id!' }); return;
    }
    res.status(200).json({ message: 'Category deleted!' })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
