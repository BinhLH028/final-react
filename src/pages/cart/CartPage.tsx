import React, { useEffect, useState } from "react";
import CartItem from "../../components/CartItem";
import styles from "./CartPage.module.css";
import { type ProductCardDTO, ProductController } from "../../API/controller/productsController";
import { useNavigate } from "react-router-dom";

type CartItemData = {
  id: number;
  quantity: number;
};

const getCartFromStorage = (): CartItemData[] => {
  const raw = localStorage.getItem("cart");
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const setCartToStorage = (cart: CartItemData[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemData[]>(getCartFromStorage());
  const [products, setProducts] = useState<ProductCardDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cartItems.length > 0) {
      Promise.all(cartItems.map((item) => ProductController.getDetailById(item.id))).then(
        (productList) => {
          setProducts(productList.filter(Boolean) as ProductCardDTO[]);
          setLoading(false);
        }
      );
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [cartItems]);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    let updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updatedCart);
    setCartToStorage(updatedCart);
  };

  const handleRemoveItem = (id: number) => {
    let updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    setCartToStorage(updatedCart);
  };

  const mergedItems = cartItems
    .map((item) => ({
      ...item,
      ...products.find((p) => p.id === item.id),
    }))
    .filter(
      (item) =>
        item.title &&
        item.price !== undefined &&
        item.thumbnail
    );

  const total = mergedItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  const handleCheckout = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!user || !token) {
      window.location.href = '/login';
      return;
    }

    alert("Checkout successful!");

    const storedCart = localStorage.getItem("checkoutCart");
    let checkedCart: any[] = [];

    if (storedCart) {
      try {
        checkedCart = JSON.parse(storedCart);
        if (!Array.isArray(checkedCart)) {
          checkedCart = [];
        }
      } catch (error) {
        console.error("Invalid cart data:", error);
        checkedCart = [];
      }
    }

    checkedCart.push(...cartItems);

    localStorage.setItem("checkoutCart", JSON.stringify(checkedCart));
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartList}>
        <h1 className={styles.header}>Your Cart</h1>
        {loading ? (
          <div>Loading...</div>
        ) : mergedItems.length === 0 ? (
          <div className={styles.empty}>Your cart is empty.</div>
        ) : (
          mergedItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              onDecrease={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              onRemove={() => handleRemoveItem(item.id)}
            />
          ))
        )}
      </div>
      <div className={styles.summaryBox}>
        <div style={{ fontWeight: 600, fontSize: "1.2rem", marginBottom: 18 }}>Order Summary</div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
        </div>
        <div className={styles.total}>
          Total: ${total.toFixed(2)}
        </div>
        <button
          className={styles.checkoutBtn}
          disabled={mergedItems.length === 0}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;