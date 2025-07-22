import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetailPage.module.css";
import { type ProductDetailDTO, ProductController } from "../../../API/controller/productsController";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Invalid product ID.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    ProductController.getDetailById(Number(id))
      .then((data) => setProduct(data))
      .catch(() => setError("Failed to load product."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return <div>No product found.</div>;

  function handleAddToCart() {
    let cart = [];
    const raw = localStorage.getItem("cart");
    if (raw) cart = JSON.parse(raw);
    const existing = cart.find((item: { id: number, quantity: number }) => item.id === product!.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: product!.id, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 2000);
  }

  return (
    <div className={styles.detailContainer}>
      {showNotif && (
        <div className={styles.notification}>Added to cart!</div>
      )}
      <div className={styles.imagesSection}>
        <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
        <div className={styles.imagesRow}>
          {product.images?.map((img, idx) => (
            <img key={idx} src={img} alt={`${product.title}-${idx}`} className={styles.subImage} />
          ))}
        </div>
      </div>
      <div className={styles.infoSection}>
        <h1 className={styles.productName}>{product.title}</h1>
        <div className={styles.price}>${product.price}</div>
        <div className={styles.stock}>
          <b>Còn lại:</b> {product.stock > 0 ? product.stock : "Out of stock"}
        </div>
        <div className={styles.description}>{product.description}</div>
        <div className={styles.rating}>
          <b>Rating:</b> {product.rating} / 5
        </div>
        <button className={styles.addToCartBtn} onClick={handleAddToCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;