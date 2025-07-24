import React from "react";
import styles from "./CartItem.module.css";

type Props = {
  item: {
    id: number;
    title?: string;
    price?: number;
    thumbnail?: string;
    quantity: number;
  };
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

const CartItem: React.FC<Props> = ({ item, onIncrease, onDecrease, onRemove }) => (
  <div className={styles.cartItem}>
    <img
      src={item.thumbnail}
      alt={item.title}
      className={styles.thumbnail}
    />
    <div className={styles.info}>
      <div className={styles.title}>{item.title}</div>
      <div>Price: ${item.price}</div>
      <div className={styles.quantityRow}>
        <button
          onClick={onDecrease}
          className={styles.qtyBtn}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={onIncrease}
          className={styles.qtyBtn}
        >
          +
        </button>
        <button
          onClick={onRemove}
          className={styles.removeBtn}
        >
          Remove
        </button>
      </div>
      <div className={styles.itemTotal}>
        Total: ${(item.price ? item.price * item.quantity : 0).toFixed(2)}
      </div>
    </div>
  </div>
);

export default CartItem;