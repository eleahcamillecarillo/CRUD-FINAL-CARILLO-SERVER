function Products() {
  const items = [
    { name: "T-Shirt", price: "$20" },
    { name: "Hoodie", price: "$35" },
    { name: "Shoes", price: "$50" },
    { name: "Jacket", price: "$60" }
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h2>Our Trending Products</h2>
      <div style={styles.grid}>
        {items.map((item, index) => (
          <div key={index} style={styles.card}>
            <img src="https://via.placeholder.com/150" alt="product"/>
            <h4>{item.name}</h4>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginTop: "20px"
  },
  card: {
    textAlign: "center",
    padding: "15px",
    border: "1px solid #ddd"
  }
};

export default Products;

