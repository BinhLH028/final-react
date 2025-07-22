import React, { useEffect, useState } from "react";
import { ProductController, type ProductCardDTO } from "../../API/controller/productsController";
import { useHomePageHook } from "./hooks/useHomePageHook";
import ProductCarousel from "./ProductCarousel";
import 'bootstrap/dist/css/bootstrap.min.css';

const VISIBLE_COUNT = 4; // Number of cards shown at once

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductCardDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  const { viewDetails } = useHomePageHook();

  useEffect(() => {
    setLoading(true);
    setError(null);

    ProductController.getLatest({ limit: 30 })
      .then(setProducts)
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex((idx) => idx - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + VISIBLE_COUNT < products.length) {
      setStartIndex((idx) => idx + 1);
    }
  };

  return (
    <ProductCarousel
      products={products}
      loading={loading}
      error={error}
      startIndex={startIndex}
      visibleCount={VISIBLE_COUNT}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onViewDetails={viewDetails}
    />
  );
};

export default HomePage;