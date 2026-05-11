const db = require("../config/db")
const { success, error } = require("../utils/response");


//INSERT PRODUCT
exports.createProduct = (req, res) => {
    const {product, category } = req.body;

    // BASIC Validation
    if (!product || !category) {
        return error(res, "Product name and category are required", 400);
    }

    const sql = "INSERT INTO tblproducts(product, category) VALUES (?, ?)";

    db.query(sql, [product, category], (err, result) => {
        if (err){
    return error(res, err.message, 500);
        }

        success(res, { id: result.insertId }, "Product created successfully");
    });
};