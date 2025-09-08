import styles from "./option-button.module.scss";

interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function OptionButton({
  label,
  isSelected,
  onClick,
}: OptionButtonProps) {
  return (
    <button
      className={`${styles.optionButton} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
