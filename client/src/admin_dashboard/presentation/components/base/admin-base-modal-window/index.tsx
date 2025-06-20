import React from "react";
import styles from "./AdminBaseModalWindow.module.css";

interface BaseModalWindowComponentProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title:string;
}

const AdminBaseModalWindow = ({
  isVisible,
  onClose,
  children,
  title
}: BaseModalWindowComponentProps): React.JSX.Element | null => {
  if (!isVisible) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modal_window__header}>{title}</div>
        <div className={styles.modal_window__body}>{children}</div></div>
    </>
  );
};

export default AdminBaseModalWindow;