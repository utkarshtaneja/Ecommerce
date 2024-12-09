const Product = require('../models/Product');

// Add Product
exports.addProduct = async (req, res) => {
    const { name, description, long_description, details, price, category, stock, color } = req.body;

    try {
        // Validate required fields
        if (!name || !description || !price || !category || !stock || !color) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const imageUrl = req.file ? req.file.path : null;

        const newProduct = new Product({
            name,
            long_description,
            description,
            price,
            category,
            details,
            stock,
            imageUrl,
            color,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
        console.error("Error adding product:", err);
        
        // Send more specific error messages based on the error type if necessary
        res.status(500).json({ message: "Error adding product", error: err.message });
    }
};
// Get Product List (or single product by ID)
exports.getProduct = async (req, res) => {
    try {
        const products = await Product.find();

        if (!products.length) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({ success: true, data: products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
};

// Add this function to handle product removal
exports.removeProduct = async (req, res) => {
    try {
      const { id } = req.body;
  
      if (!id) {
        return res.status(400).json({ success: false, message: "Product ID is required." });
      }
  
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: "Product not found." });
      }
  
      res.status(200).json({ success: true, message: "Product removed successfully." });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error removing product.", error });
    }
  };
  

// Get Product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params; 

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching product", error: err.message });
    }
};


// Update Product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;  
    const { name, description, long_description, details, price, category, stock, color } = req.body;

    try {
        // Check if file is uploaded, if so, update imageUrl
        const imageUrl = req.file ? req.file.path : null;

        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                long_description,
                description,
                price,
                category,
                details,
                stock,
                imageUrl,
                color,
            },
            { new: true }  
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating product", error: err.message });
    }
};
