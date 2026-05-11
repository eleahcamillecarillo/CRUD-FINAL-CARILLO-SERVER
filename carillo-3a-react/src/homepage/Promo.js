function Promo() {
  return (
    <div style={styles.promo}>
      <div>
        <h2>50% Off Summer Sale</h2>
        <button>Shop Now</button>
      </div>
      <img src="https://via.placeholder.com/300" alt="promo"/>
    </div>
  );
}

const styles = {
  promo: {
    display: "flex",
    justifyContent: "space-between",
    padding: "60px",
    background: "#eee"
  }
};

export default Promo;
