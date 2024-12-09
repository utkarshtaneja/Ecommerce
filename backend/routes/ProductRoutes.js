const express = require('express');
const { addProduct, getProduct, removeProduct, getProductById, updateProduct } = require("../controllers/ProductController");
const multer = require("multer");
const router = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination : "uploads",
    filename : (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({storage : storage});

router.post("/add", upload.single("imageUrl"), addProduct);
router.get("/list", getProduct);
router.get("/:id", getProductById);
router.post("/remove",removeProduct);
router.put('/update/:id', upload.single('imageUrl'), updateProduct);

module.exports = router;