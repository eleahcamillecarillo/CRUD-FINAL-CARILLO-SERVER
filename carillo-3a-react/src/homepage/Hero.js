function Hero() {
  return (
    <div style={styles.hero}>
      <div>
        <h1>New Collection</h1>
        <p>Discover the latest fashion trends</p>
        <button>Shop Now</button>
      </div>
      <img 
        src="https://via.placeholder.com/400" 
        alt="banner" 
      />
    </div>
  );
}

const styles = {
  hero: {
    display: "flex",
    justifyContent: "space-between",
    padding: "60px",
    background: "#f5f5f5"
  }
};

export default Hero;
