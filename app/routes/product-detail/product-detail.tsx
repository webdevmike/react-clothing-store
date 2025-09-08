import type { Route } from "./+types/product-detail";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import type { Product } from "~/types/product";
import Loader from "~/components/loader";
import { fetchProductById } from "~/services/products";
import ProductSingle from "~/components/product-single/product-single";
import styles from "./product-detail.module.scss";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clothing Store | Product" },
    { name: "description", content: "Product page" },
  ];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProduct = async (): Promise<void> => {
      if (!id) return;

      try {
        setLoading(true);
        const foundProduct = await fetchProductById(parseInt(id));
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : product == null ? (
        <div>Could not load product</div>
      ) : (
        <div className={styles.productDetailWrapper}>
          <ProductSingle product={product} showDescription={true} />
        </div>
      )}
    </div>
  );
}
