import errorHandler from "../middlewares/errorHandler.js";
import Product from "../models/productModel.js";

// adding product
const addProduct = errorHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      brand,
      image,
      rating,
      countInStock,
      numReviews,
      reviews,
    } = req.fields;
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !image:
        return res.json({ error: "Image is required" });
    }

    const product = await new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

//updating product

const updatingProductDetails = errorHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      brand,
      image,
      rating,
      countInStock,
      numReviews,
      reviews,
    } = req.fields;
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !image:
        return res.json({ error: "Image is required" });
    }

    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    await updateProduct.save();
    res.json(updateProduct);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

// discard product
const discardProduct = errorHandler(async (req, res) => {
  try {
    const removeProduct = await Product.findByIdAndDelete(req.params.id);
    res.json(removeProduct);
    if (removeProduct) {
      res.status(200).json("Product successfully deleted");
    } else {
      return res.status(404).json("Cannot delete product");
    }
  } catch (error) {}
});

const getProducts = errorHandler(async (req, res) => {
  try {
    // define the number of products display per page
    const pageSize = 6;
    const page = Number(req.query.page) || 1;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({
      ...keyword,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      hasMore: page < Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(500).json({ error: "Sever Error" });
  }
});

// get single product

const getSingleProduct = errorHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

// all the products

const getAllProducts = errorHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    if (products) {
      return res.json(products);
    } else {
      res.status(404);
      throw new Error("Not found");
    }
  } catch (error) {
    res.status(404).json({ error: "Failed to get products" });
  }
});

// post review

const addProductReview = errorHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyreviewed = product.reviews.find(
        (r) => r.user.toString() === r.user._id.toString()
      );
      if (alreadyreviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => acc + item.rating, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = errorHandler(async (req, res) => {
  const topProducts = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.json(topProducts);
});

const fetchNewProducts = errorHandler(async (req, res) => {
  try {
    const newProducts = await Product.find().sort({ _id: -1 }).limit(6);

    res.json(newProducts);
  } catch {
    res.status(400).json(error.message);
  }
});

export {
  addProduct,
  updatingProductDetails,
  discardProduct,
  getProducts,
  getSingleProduct,
  getAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
};
