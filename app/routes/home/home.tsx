import type { Route } from "./+types/home";
import styles from "./home.module.scss";
import Products from "../../components/product-list/product-list";
import { githubRepoUrl } from "../../constants";
import { fetchProducts } from "~/services/products";
import type { Product } from "~/types/product";
import { useState, useEffect } from "react";
import ProductSingle from "~/components/product-single/product-single";
import Loader from "~/components/loader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clothing Store | Home" },
    { name: "description", content: "Welcome to the Clothing Store!" },
  ];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="container">
      <div className={styles.welcomeMsg}>
        <p>
          Welcome! This app showcases React fundamentals through an e-commerce
          experience. The minimal design is intentional - the focus here is to
          demonstrate my ability to build interactive React apps with real-world
          functionality. This is my own implementation, not code from a
          tutorial. Browse the store, add items to your cart, and visit the{" "}
          <a href={githubRepoUrl} target="_blank">
            GitHub repo
          </a>{" "}
          to take a look under the hood.
        </p>
      </div>
      <div className={styles.productsWrapper}>
        {loading ? (
          <Loader />
        ) : products == null ? (
          <div>Could not load products</div>
        ) : (
          <>
            <Products products={products} />
            <div className={styles.featuredProductWrapper}>
              <h2>Featured Product</h2>
              <ProductSingle
                product={products[0]}
                initialColor={products[0].options[1].values[1]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
