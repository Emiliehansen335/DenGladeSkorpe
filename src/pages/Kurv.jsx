import { useCart } from "../context/CartContext";
import { useState } from "react";
import styles from "./kurv.module.css";

const Kurv = () => {
  const { cart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [comment, setComment] = useState("");

  // Gruppér items for at tælle antal
  const groupedCart = cart.reduce((acc, item) => {
    const key = `${item.id}-${item.size}-${item.price}`;
    if (acc[key]) {
      acc[key].quantity += 1;
    } else {
      acc[key] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});

  const cartItems = Object.values(groupedCart);
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
        comment: comment || "Ingen specielle ønsker",
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
      setComment("");
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
          <div className={styles.cartItemsContainer}>
            {cartItems.map((item, idx) => (
              <ul key={idx} className={styles.cartItemList}>
                <li className={styles.cartItemWrapper}>
                  <div className={styles.cartItems}>
                    <div className={styles.itemQuantity}>{item.quantity}x</div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.itemImage}
                    />
                    <div className={styles.itemTitle}>{item.title}</div>
                  </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemSize}>
                      <a href="">Størrelse:</a> {item.size}
                    </div>
                    <div className={styles.itemPrice}>
                      <a href="">Pris:</a> {item.price} kr{" "}
                      {item.quantity > 1 &&
                        `(${item.price * item.quantity} kr total)`}
                    </div>
                  </div>
                </li>
              </ul>
            ))}
          </div>

          <div className={styles.totalSection}>
            <div className={styles.totalPrice}>I alt: {totalPrice},- </div>
          </div>

          <div className={styles.commentSection}>
            <textarea
              id="orderComment"
              className={styles.commentTextarea}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Kommentar til ordren"
              rows={3}
              maxLength={250}
            />
          </div>

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
        </>
      )}
    </div>
  );
};

export default Kurv;
