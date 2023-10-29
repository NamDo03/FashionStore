const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCTS AND FILTER
router.get("/", async (req, res) => {
  const { category, subCategory, page, pageSize, sort, price } = req.query;
  const currentPage = parseInt(page) || 1;
  const limit = parseInt(pageSize) || 9;

  try {
    let query = {};
    let sortOptions = {};
    const defaultSort = sort || 'newest';

    if (category) {
      query.categories = category;
    }

    if (subCategory) {
      query.subCat = { $regex: new RegExp(subCategory, 'i') };
    }

    if (defaultSort === 'newest') {
      sortOptions = { date: -1 };
    } else if (defaultSort === 'asc') {
      sortOptions = { price: 1 };
    } else if (defaultSort === 'desc') {
      sortOptions = { price: -1 };
    }

    if (price) {
      if (price === 'under50') {
        query.price = { $lt: 50 };
      } else if (price === '50-100') {
        query.price = { $gte: 51, $lte: 100 };
      } else if (price === '100-250') {
        query.price = { $gte: 101, $lte: 250 };
      } else if (price === 'above250') {
        query.price = { $gt: 251 };
      }
    }

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((currentPage - 1) * limit)
      .limit(limit);

    const totalProductsFilter = await Product.countDocuments(query);
    const totalProducts = await Product.countDocuments({ categories: category });

    if (products.length === 0) {
      console.log("Không có sản phẩm phù hợp");
      return res.status(200).json({ products: [], totalProducts, totalProductsFilter });
    }

    res.status(200).json({ products, totalProducts, totalProductsFilter });
  } catch (err) {
    console.error("Lỗi khi lấy sản phẩm: ", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// SEARCH PRODUCTS BY TITLE
router.get("/search", async (req, res) => {
  const { title } = req.query;

  try {
    if (!title) {
      return res.status(400).json({ message: "Tên sản phẩm không được để trống" });
    }

    const products = await Product.find({ title: { $regex: new RegExp(title, 'i') } });

    if (products.length === 0) {
      console.log("Không tìm thấy sản phẩm");
      return res.status(200).json({ message: "Không tìm thấy sản phẩm nào" });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error("Lỗi khi tìm kiếm sản phẩm: ", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});


//GET RAMDOM PRODUCTS
router.get("/ramdomProducts", async (req, res) => {
  try {
    let products = await Product.aggregate([
      { $sample: { size: 6 } },
    ]);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;