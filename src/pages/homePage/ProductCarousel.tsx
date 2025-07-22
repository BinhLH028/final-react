import React from "react";
import styles from "./HomePage.module.css";

interface Product {
  id: string | number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

interface ProductCarouselProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  startIndex: number;
  visibleCount: number;
  onPrevious: () => void;
  onNext: () => void;
  onViewDetails: (id: string | number) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  loading,
  error,
  startIndex,
  visibleCount,
  onPrevious,
  onNext,
  onViewDetails,
}) => {
  const canGoLeft = startIndex > 0;
  const canGoRight = startIndex + visibleCount < products.length;

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Latest Products</h1>
      
      <div className={styles.carouselContainer}>
        <button
          className={`${styles.arrow} ${styles.leftArrow} ${!canGoLeft ? styles.disabled : ''}`}
          onClick={onPrevious}
          disabled={!canGoLeft}
          aria-label="Previous products"
        >
          &#8592;
        </button>
        
        <div className={styles.carouselViewport}>
          <div 
            className={styles.carouselRow}
            style={{
              transform: `translateX(-${startIndex * (100 / visibleCount)}%)`
            }}
          >
            {products.map((product) => (
              <div key={product.id} className={styles.productCard} onClick={() => onViewDetails(product.id)}>
                <div className={styles.imageContainer}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className={styles.thumbnail}
                    loading="lazy"
                  />
                </div>
                
                <div className={styles.cardContent}>
                  <h3 className={styles.title}>{product.title}</h3>
                  <div className={styles.price}>${product.price.toFixed(2)}</div>
                  <p className={styles.description}>
                    {product.description.length > 80
                      ? `${product.description.slice(0, 80)}...`
                      : product.description}
                  </p>
                  <button 
                    className={styles.detailsButton} 
                    onClick={() => onViewDetails(product.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button
          className={`${styles.arrow} ${styles.rightArrow} ${!canGoRight ? styles.disabled : ''}`}
          onClick={onNext}
          disabled={!canGoRight}
          aria-label="Next products"
        >
          &#8594;
        </button>
      </div>
      
      <div className={styles.indicators}>
        <span className={styles.indicatorText}>
          {startIndex + 1} - {Math.min(startIndex + visibleCount, products.length)} of {products.length}
        </span>
      </div>
    </div>
  );
};

export default ProductCarousel;