import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
      try {
        const res = await api.get("/api/v1/products");
        const data = res.data.data;
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:",err.response?.data || err.message);
        setProducts([]);
      }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id_product}>
                        {product.product} - {product.category}
                    </li>
          )  )}
            </ul>
        </div>
    );
}