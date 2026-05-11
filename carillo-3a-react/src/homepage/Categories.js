function Categories() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>Women Collection</div>
      <div style={styles.card}>Men Collection</div>
      <div style={styles.card}>Kids Collection</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-around",
    padding: "40px"
  },
  card: {
    width: "250px",
    height: "150px",
    background: "#ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  }
};

export default Categories;
