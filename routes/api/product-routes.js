const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    // find all products
    const products = await Product.findAll({
      // be sure to include its associated Category and Tag data
      include: [{ model: Category }, { model: Tag, }]
    })
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    // find a single product by its `id`
    const product = await Product.findByPk(req.params.id, {
      // be sure to include its associated Category and Tag data
      include: [{ model: Category }, { model: Tag }]
    });
    if (!product) {
      res.status(404).json({ message: 'no product find!' });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    /* req.body should look like this...
      {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
    */
    const { product_name, price, stock, tagIds } = req.body;

    if (!product_name || !price || !stock) {
      return res.status(400).json({ message: 'Product name, price, and stock are required!' });
    }

    const product = await Product.create({ product_name, price, stock });

    if (tagIds && tagIds.length) {
      const productTagIdArr = tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });

      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // update product data
    const { product_name, price, stock, tagIds } = req.body;

    if (!product_name && !price && !stock && !tagIds) {
      return res.status(400).json({ message: 'No data provided for update!' });
    }

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'No product found!' });
    }

    await product.update({ product_name, price, stock });

    if (tagIds && tagIds.length) {
      const existingProductTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      const existingTagIds = existingProductTags.map(({ tag_id }) => tag_id);

      const newProductTags = tagIds.filter((tag_id) => !existingTagIds.includes(tag_id)).map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });

      await ProductTag.bulkCreate(newProductTags);

      const productTagsToRemove = existingProductTags.filter(({ tag_id }) => !tagIds.includes(tag_id)).map(({ id }) => id);
      await ProductTag.destroy({ where: { id: productTagsToRemove } });
    }

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete one product by its `id` value
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'no product find!' });
    } else {
      await product.destroy();
      res.status(200).json({ message: 'delted product!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
