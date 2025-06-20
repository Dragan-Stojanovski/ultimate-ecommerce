import React from "react";
import {
  Controller,
  type Control,
  type RegisterOptions,
} from "react-hook-form";

import styles from "./AdminTextArea.module.css";

interface IAdminTextAreaProps {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
  placeholder?: string;
  rows?: number;
  cols?: number;
  label?: string;
}

const AdminTextArea = ({
  name,
  control,
  rules,
  placeholder,
  rows = 5,
  cols = 40,
  label,
}: IAdminTextAreaProps): React.JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <div className={styles.wrapper}>
          {label && (
            <label htmlFor={name} className={styles.label}>
              {label}
            </label>
          )}
          <textarea
            id={name}
            name={name}
            ref={ref}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            cols={cols}
            className={`${styles.textarea} ${error ? styles.error : ""}`}
          />
          {error && (
            <span className={styles.errorMessage}>{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default AdminTextArea;
