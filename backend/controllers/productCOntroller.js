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

export { addProduct, updatingProductDetails, discardProduct, getProducts };
