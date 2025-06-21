import styles from "./BaseButton.module.css";

/**
 * @param text - The label displayed on the button.
 * @param type - Defines the button's action type.
 */
export interface IBaseButtonProps {
  text: string;
  type: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
}

const BaseButton = ({ text, type, onClick }: IBaseButtonProps) => {
  return (
    <button
      className={styles.base_button_wrapper}
      type={type}
      onClick={onClick}
    >
      {text}{" "}
    </button>
  );
};

export default BaseButton;
