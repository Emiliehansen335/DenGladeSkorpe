import { useCart } from "../context/CartContext";
import styles from "./kurv.module.css";

const Kurv = () => {
  const { cart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.kurvContainer}>
      <h2 className={styles.kurvTitle}>Bestilling</h2>
      {cart.length === 0 ? (
        <p className={styles.emptyCart}>Kurven er tom.</p>
      ) : (
        <>
          <ul className={styles.cartItems}>
            {cart.map((item, idx) => (
              <li key={idx} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <div className={styles.itemTitle}>{item.title}</div>
                  <div className={styles.itemSize}>Størrelse: {item.size}</div>
                </div>
                <div className={styles.itemPrice}>{item.price} kr</div>
              </li>
            ))}
          </ul>

          <div className={styles.totalSection}>
            <div className={styles.totalPrice}>I alt: {totalPrice},- </div>
            <button className={styles.checkoutButton}>Gå til betaling</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Kurv;
