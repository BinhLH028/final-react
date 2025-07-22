import React, { useState } from "react";
import styles from "./ProductListPage.module.css"; // Đảm bảo đã có class cho table, button, ...

const VISIBLE_COUNT = 10; // số sản phẩm mỗi trang

interface ProductCardDTO {
    id: number;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
}

interface Props {
    products: ProductCardDTO[];
    search: string;
    viewDetails: (id: number) => void;
}

const ProductTable: React.FC<Props> = ({ products, search, viewDetails }) => {
    const [page, setPage] = useState(1);
    const filteredProducts = !search
    ? products
    : products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );

    const totalPage = Math.ceil(filteredProducts.length / VISIBLE_COUNT);
    const startIndex = (page - 1) * VISIBLE_COUNT;
    const visibleProducts = filteredProducts.slice(startIndex, startIndex + VISIBLE_COUNT);

    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => setPage((p) => Math.min(totalPage, p + 1));

    return (
        <div>
            <table className={styles.productTable}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {visibleProducts.map((p, idx) => (
                        <tr key={p.id}>
                            <td>{startIndex + idx + 1}</td>
                            <td>
                                <img
                                    src={p.thumbnail}
                                    alt={p.title}
                                    className={styles.thumbnail}
                                    style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
                                />
                            </td>
                            <td>{p.title}</td>
                            <td>${p.price}</td>
                            <td>
                                {p.description.length > 80
                                    ? p.description.slice(0, 80) + "..."
                                    : p.description}
                            </td>
                            <td>
                                <button
                                    className={styles.detailsButton}
                                    onClick={() => viewDetails(p.id)}
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                    {visibleProducts.length === 0 && (
                        <tr>
                            <td colSpan={6} style={{ textAlign: "center", color: "#888" }}>
                                No products found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <button
                    className={styles.pageBtn}
                    onClick={handlePrev}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <span className={styles.pageInfo}>
                    Page {page} / {totalPage}
                </span>
                <button
                    className={styles.pageBtn}
                    onClick={handleNext}
                    disabled={page === totalPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductTable;