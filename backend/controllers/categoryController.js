import errorHandler from "../middlewares/errorHandler.js";
import Category from "../models/categoryModel.js";

// create category
const createCategory = errorHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: "Already exists" });
    }

    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// update category

const updateCategory = errorHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
});

export { createCategory, updateCategory };
