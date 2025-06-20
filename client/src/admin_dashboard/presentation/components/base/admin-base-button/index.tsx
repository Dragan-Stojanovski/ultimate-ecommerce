import React from "react";
import styles from "./AdminBaseButton.module.css";

/**
 * Interface defining the properties for BaseButton.
 *
 * @param type - Specifies the button type attribute. Common types include "button", "submit", and "reset".
 * @param content - Text or content displayed on the button.
 */
export interface IAdminBaseButtonProps {
  type: "button" | "submit" | "reset";
  content: string;
  onClick?: () => void;
  isDestructive?: boolean;
}

/**
 * BaseButton is a reusable button component.
 * It accepts `type` and `content` as props to define its behavior and display.
 * Props {@link IAdminBaseButtonProps}
 * @returns The JSX Element representing a button.
 */
const AdminBaseButton = ({
  type,
  content,
  onClick,
  isDestructive = false,
}: IAdminBaseButtonProps): React.JSX.Element => {
  const buttonClass = `${styles.base_btn} ${
    isDestructive ? styles.destructive : ""
  }`;

  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {content}
    </button>
  );
};

export default AdminBaseButton;
