const db = require("../config/db");

exports.getAllProducts = async () => {
    const [rows] = await db.query("SELECT * FROM tblproducts");
    return rows;
};

exports.findById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM tblproducts WHERE id_product = ?",
        [id]
    );
    return rows[0] || null;
};

exports.createProduct = async (data) => {
    const { product, category } = data;

    const [result] = await db.query(
        "INSERT INTO tblproducts (product, category) VALUES(?, ?)",
        [product, category]
    );

    return result;
};

exports.updateProduct = async (id, data) => {
    const { product, category } = data;

    const [result] = await db.query(
        "UPDATE tblproducts SET product = ?, category = ? WHERE id_product = ?",
        [product, category, id]
    );

    return result;
};

exports.patchProduct = async (id, data) => {
    const fields = [];
    const values = [];

    if (Object.prototype.hasOwnProperty.call(data, "product")) {
        fields.push("product = ?");
        values.push(data.product);
    }
    if (Object.prototype.hasOwnProperty.call(data, "category")) {
        fields.push("category = ?");
        values.push(data.category);
    }

    if (fields.length === 0) {
        return { affectedRows: 0, changedRows: 0 };
    }

    values.push(id);
    const [result] = await db.query(
        `UPDATE tblproducts SET ${fields.join(", ")} WHERE id_product = ?`,
        values
    );
    return result;
};

exports.deleteProduct = async (id) => {
    const [result] = await db.query(
        "DELETE FROM tblproducts WHERE id_product = ?",
        [id]
    );
    return result;
};

