const { success, error } = require("../utils/response");
const Product = require("../model/productModel");

const parseId = (value) => {
    const id = Number.parseInt(value, 10);
    return Number.isFinite(id) && id > 0 ? id : null;
};

const validateRequiredFields = ({ product, category }) => {
    if (!product || typeof product !== "string" || product.trim().length === 0) {
        return "Product name is required";
    }
    if (!category || typeof category !== "string" || category.trim().length === 0) {
        return "Category is required";
    }
    return null;
};

//GET ALL PRODUCTS
const index = async (req, res) => {
    try {
        const results = await Product.getAllProducts();
        return success(res, results, "Products retrieved successfully");
    } catch (err) {
return error(res, err.message,500);
    }
};

//GET SINGLE PRODUCT
const show = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if (!id) {
            return error(res, "Invalid product id", 400);
        }

        const product = await Product.findById(id);
        if (!product) {
            return error(res, "Product not found", 404);
        }

        return success(res, product, "Product retrieved successfully");
    } catch (err) {
        return error(res, err.message, 500);
    }
};


//INSERT PRODUCT
const create = async (req, res) => {
    try {
        const validationError = validateRequiredFields(req.body || {});
        if (validationError) {
            return error(res, validationError, 400);
        }

        const result = await Product.createProduct(req.body);

        const created = await Product.findById(result.insertId);
        return success(res, created || { id_product: result.insertId }, "Product created successfully");
    } catch (err) {
return error(res, err.message,500);
    }
};

//UPDATE / PATCH PRODUCT
const update = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if (!id) {
            return error(res, "Invalid product id", 400);
        }

        const existing = await Product.findById(id);
        if (!existing) {
            return error(res, "Product not found", 404);
        }

        const body = req.body || {};

        if (req.method === "PUT") {
            const validationError = validateRequiredFields(body);
            if (validationError) {
                return error(res, validationError, 400);
            }

            await Product.updateProduct(id, {
                product: body.product,
                category: body.category,
            });
        } else {
            const allowProduct = Object.prototype.hasOwnProperty.call(body, "product");
            const allowCategory = Object.prototype.hasOwnProperty.call(body, "category");
            if (!allowProduct && !allowCategory) {
                return error(res, "Nothing to update", 400);
            }

            if (allowProduct && (typeof body.product !== "string" || body.product.trim().length === 0)) {
                return error(res, "Product name must be a non-empty string", 400);
            }
            if (allowCategory && (typeof body.category !== "string" || body.category.trim().length === 0)) {
                return error(res, "Category must be a non-empty string", 400);
            }

            await Product.patchProduct(id, body);
        }

        const updated = await Product.findById(id);
        return success(res, updated, "Product updated successfully");
    } catch (err) {
        return error(res, err.message, 500);
    }
};

//DELETE PRODUCT
const destroy = async (req, res) => {
    try {
        const id = parseId(req.params.id);
        if (!id) {
            return error(res, "Invalid product id", 400);
        }

        const existing = await Product.findById(id);
        if (!existing) {
            return error(res, "Product not found", 404);
        }

        await Product.deleteProduct(id);
        return success(res, { id_product: id }, "Product deleted successfully");
    } catch (err) {
        return error(res, err.message, 500);
    }
};


module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
