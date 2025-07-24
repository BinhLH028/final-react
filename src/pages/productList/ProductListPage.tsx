import React, { useEffect, useState } from "react";
import styles from "./ProductListPage.module.css";
import { type ProductCategoryDTO, type ProductCardDTO, ProductController } from "../../API/controller/productsController";
import ProductTable from "./component/ProductTable";
import { useNavigate } from "react-router-dom";

const ProductListPage: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategoryDTO[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductCardDTO[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    ProductController.getAllCategory().then((data) => {
      if (data) setCategories(data);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    ProductController.getCategorizedProducts(selectedCategory)
      .then(setProducts)
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  function viewDetails(id: number): void {
    navigate(`/product/${id}`);
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <form className={styles.topBar}>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className={styles.categorySelect}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products…"
          className={styles.searchInput}
        />
      </form>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <ProductTable products={products} search={search} viewDetails={viewDetails} />
        )}
      </div>
    </div>
  );
};

export default ProductListPage;