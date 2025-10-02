import { useCart } from "../context/CartContext";
import { useState } from "react";
import styles from "./kurv.module.css";

const Kurv = () => {
  const { cart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [comment, setComment] = useState(""); // Tilføjet state for kommentar

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsLoading(true);
    setOrderStatus(null);

    try {
      const orderData = {
        dishes: cart.map((item) => ({
          dish: item.id,
        })),
        totalPrice: totalPrice,
        comment: comment || "Ingen specielle ønsker", // Bruger brugerens kommentar
        shipped: false,
      };

      console.log("Sending order data:", orderData);
      console.log("Cart items:", cart);
      console.log(
        "Item IDs:",
        cart.map((item) => item.id)
      );

      const response = await fetch("http://localhost:3042/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(`Fejl ved oprettelse af ordre: ${response.status}`);
      }

      const result = await response.json();
      console.log("Ordre oprettet SUCCESS:", result);
      console.log("Ordre ID:", result.data?._id || result._id);

      setOrderStatus("success");
      setComment(""); // Nulstil kommentar
      clearCart();
    } catch (error) {
      console.error("Fejl ved checkout:", error);
      setOrderStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  if (orderStatus === "success") {
    return (
      <div className={styles.kurvContainer}>
        <h2 className={styles.kurvTitle}>Tak for din bestilling!</h2>
        <p className={styles.successMessage}>
          Din ordre er modtaget og bliver behandlet.
        </p>
        <button
          className={styles.checkoutButton}
          onClick={() => setOrderStatus(null)}
        >
          Lav ny bestilling
        </button>
      </div>
    );
  }

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

          {/* Tilføjet kommentar sektion */}
          <div className={styles.commentSection}>
            <label htmlFor="orderComment" className={styles.commentLabel}>
              Specielle ønsker (valgfrit):
            </label>
            <textarea
              id="orderComment"
              className={styles.commentTextarea}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="F.eks. ingen løg, ekstra ost, leveringstid..."
              rows={3}
              maxLength={250}
            />
            <div className={styles.characterCount}>
              {comment.length}/250 tegn
            </div>
          </div>

          <div className={styles.totalSection}>
            <div className={styles.totalPrice}>I alt: {totalPrice},- </div>
            <button
              className={styles.checkoutButton}
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? "Behandler..." : "Gå til betaling"}
            </button>
            {orderStatus === "error" && (
              <p className={styles.errorMessage}>
                Fejl ved oprettelse af ordre. Prøv igen.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Kurv;
