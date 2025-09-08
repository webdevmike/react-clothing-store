import type { Product } from "~/types/product";
import styles from "./product-list.module.scss";
import { Link } from "react-router";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <>
      <div className={styles.productGrid}>
        {products.map((product) => {
          const [sizeOption, colorOption] = product.options;

          const startingAtPrice = sizeOption.values[0].price;
          const firstOptionColorHex = colorOption.values[0].hex;
          const availableColors = colorOption.values
            .map((val) => val.label)
            .join(", ");
          const availableSizes = sizeOption.values
            .map((val) => val.label)
            .join(", ");

          return (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className={styles.productCard}
            >
              <div
                className={styles.productImage}
                style={{ backgroundColor: firstOptionColorHex }}
              >
                <h2>{product.name}</h2>
              </div>
              <div className={styles.row}>
                Starting at{" "}
                <span className={styles.price}>${startingAtPrice}</span>
              </div>
              <div className={styles.row}>
                <span>Sizes:</span> {availableSizes}
              </div>
              <div className={styles.row}>
                <span>Colors:</span> {availableColors}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
