function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>Shopee</h2>
      <ul style={styles.menu}>
        <li>Home</li>
        <li>Shop</li>
        <li>Abou t</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "#222",
    color: "white"
  },
  menu: {
    display: "flex",
    gap: "20px",
    listStyle: "none"
  }
};

export default Navbar;

