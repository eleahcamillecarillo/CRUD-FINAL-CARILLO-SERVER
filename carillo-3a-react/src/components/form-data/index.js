import React, { useState } from "react";
import ProductList from "./view";

export default function ProductForm() {
const [product, setProduct] = useState("");
const [category, setCategory] = useState("");

const handleSubmit = async (e) => {
e.preventDefault();

try {
const response = await api.post("/api/v1/products", {

product: product,
category: category,
})
alert("Product added successfully!");

setProduct("");
setCategory("");

console.log(response.data);
} catch (err) {
    console.error(err.response?.data || err.message);
alert("Failed to add product");
}
};

return (
<div style={{ padding: 20 }}>
<h2>Add Product</h2>

<form onSubmit={handleSubmit}>
<input
type="text"
placeholder="Product Name"
value={product}
onChange={(e) => setProduct(e.target.value)}
/>

<br /><br />

<input
type="text"
placeholder="Category"
value={category}
onChange={(e) => setCategory(e.target.value)}
/>

<br /><br />

<button type="submit">Submit</button>
</form>

<ProductList />

</div>
);
}

