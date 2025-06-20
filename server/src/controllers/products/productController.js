const Product = require("../../models/products/productSchema");

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, image, category } = req.body;

    const newProduct = new Product({
      title,
      description,
      price,
      image,
      category,
    });

    await newProduct.save();

    res.status(201).json({
      id: newProduct._id,
      title: newProduct.title,
      description: newProduct.description,
      price: newProduct.price,
      image: newProduct.image,
      category: newProduct.category,
      createdAt: newProduct.createdAt,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in creating product", error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in fetching products", error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in fetching product", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, image, category } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        image,
        category,
      },
      { new: true } // return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in updating product", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in deleting product", error: error.message });
  }
};
