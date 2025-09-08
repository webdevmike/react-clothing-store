import styles from "./product-single.module.scss";
import { useState } from "react";
import type { ColorValue, Product, SizeValue } from "~/types/product";
import OptionButton from "~/components/option-button/option-button";
import { Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function ProductSingle({
  product,
  initialColor,
  showDescription = false,
}: {
  product: Product;
  initialColor?: ColorValue | null;
  showDescription?: boolean;
}) {
  const [selectedColor, setSelectedColor] = useState<ColorValue>(
    initialColor ?? product.options[1].values[0]
  );
  const [selectedSize, setSelectedSize] = useState<SizeValue>(
    product.options[0].values[0]
  );
  const [quantity, setQuantity] = useState<"" | number>(1);

  const imageDescription = `${selectedSize.label} ${selectedColor.label}`;
  const imageHex = selectedColor.hex;
  const selectedPrice = selectedSize.price;

  const handleQuantityIncrement = () => {
    setQuantity((prev) => (typeof prev === "number" ? prev + 1 : 1));
  };

  const handleQuantityDecrement = () => {
    setQuantity((prev) =>
      typeof prev === "number" ? Math.max(1, prev - 1) : 1
    );
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        setQuantity(numValue);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cartItem = {
      productName: product.name,
      color: selectedColor.label,
      size: selectedSize.label,
      quantity: quantity || 1,
    };

    toast.success(
      `Added ${cartItem.quantity} × ${cartItem.productName} (${cartItem.size}, ${cartItem.color}) to cart`
    );
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
        containerStyle={{
          position: "relative",
        }}
      />
      <div className={styles.singleProductWrapper}>
        <div className={styles.productTop}>
          <div
            className={styles.productImage}
            style={{ backgroundColor: imageHex }}
          >
            <h2>{imageDescription}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <h1>{product.name}</h1>
            <div className={styles.price}>${selectedPrice}</div>
            {product.options.map((option, index) => (
              <div key={option.name} className={styles.optionSelector}>
                <div className={styles.title}>{option.name}:</div>
                <div className={styles.optionButtonsContainer}>
                  {index === 0
                    ? // First option is SizeOption
                      option.values.map((value) => (
                        <OptionButton
                          key={value.label}
                          label={value.label}
                          isSelected={selectedSize?.label === value.label}
                          onClick={() => setSelectedSize(value as SizeValue)}
                        />
                      ))
                    : // Second option is ColorOption
                      option.values.map((value) => (
                        <OptionButton
                          key={value.label}
                          label={value.label}
                          isSelected={selectedColor?.label === value.label}
                          onClick={() => setSelectedColor(value as ColorValue)}
                        />
                      ))}
                </div>
              </div>
            ))}
            <div className={styles.title}>Quantity:</div>
            <div className={styles.quantitySelector}>
              <button
                type="button"
                onClick={handleQuantityDecrement}
                className={styles.quantityButton}
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className={styles.quantityInput}
              />
              <button
                type="button"
                onClick={handleQuantityIncrement}
                className={styles.quantityButton}
              >
                <Plus size={16} />
              </button>
            </div>
            <button type="submit" className={styles.addToCartButton}>
              Add to Cart
            </button>
          </form>
        </div>
        {showDescription && (
          <div className={styles.description}>{product.description}</div>
        )}
      </div>
    </div>
  );
}
