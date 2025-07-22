import { baseApiCall } from "../baseApi";

/**
 * ProductCardDTO: Only the fields you want to display in the product card on HomePage.
 */
export type ProductCardDTO = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
};

export type ProductCategoryDTO = {
  slug: string;
  name: string;
  url: string;
};

export type ProductDetailDTO = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  brand: string;
  category: string;
  discountPercentage: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: {
    createdAt?: string;
    updatedAt?: string;
    barcode?: string;
    qrCode?: string;
  };
};

/**
 * (Optional) RawProduct: Represents the full product object as returned by the API.
 * Only necessary if you want more type safety when mapping from API data.
 */
type RawProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  // ...other fields, if needed
};

type ProductListResponse = {
  products: RawProduct[];
};

export const ProductController = {
  // Fetch the latest products (optionally pass search/paging params)
  async getLatest(params?: Record<string, any>): Promise<ProductCardDTO[]> {
    const data = await baseApiCall<ProductListResponse>({
      method: "GET",
      url: "/products",
      params,
    });
    // Map each API product object to a ProductCardDTO
    return (data.products || []).map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      thumbnail: p.thumbnail,
    }));
  },

  // Fetch a single product by ID (for detail pages)
  async getDetailById(id: number): Promise<ProductDetailDTO | null> {
    const product = await baseApiCall<any>({
      method: "GET",
      url: "/products/:id",
      pathParams: { id },
    });
    if (!product) return null;

    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      thumbnail: product.thumbnail,
      images: product.images,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
      discountPercentage: product.discountPercentage,
      warrantyInformation: product.warrantyInformation,
      shippingInformation: product.shippingInformation,
      availabilityStatus: product.availabilityStatus,
      returnPolicy: product.returnPolicy,
      minimumOrderQuantity: product.minimumOrderQuantity,
      meta: product.meta
    };
  },

  async getAllCategory(): Promise<ProductCategoryDTO[] | null> {
    const categories = await baseApiCall<any[]>({
      method: "GET",
      url: "/products/categories",
    });
    if (!categories) return null;
    return categories;
  },

  async getCategorizedProducts(category?: string): Promise<ProductCardDTO[]> {
    const cat = category || "groceries";
    const data = await baseApiCall<ProductListResponse>({
      method: "GET",
      url: `/products/category/${cat}`,
    });
    return (data.products || []).map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      thumbnail: p.thumbnail,
    }));
  },
};