import React from "react";
import {
  Controller,
  type Control,
  type RegisterOptions,
} from "react-hook-form";
import styles from "./AdminSelectController.module.css";

interface IAdminSelectControllerProps {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
  label: string;
  options: { label: string; value: string | undefined }[];
  fullWidth?: boolean;
  placeholder?: string;
}

/**
 * AdminSelectController is a custom select field integrated with react-hook-form.
 */
const AdminSelectController: React.FC<IAdminSelectControllerProps> = ({
  name,
  control,
  rules,
  label,
  options,
  fullWidth = true,
  placeholder,
}) => {
  const id = `${label.toLowerCase().replace(/\s+/g, "-")}-select`;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div
          className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ""}`}
        >
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
          <select
            id={id}
            {...field}
            value={field.value ?? ""}
            className={`${styles.select} ${
              fieldState.error ? styles.error : ""
            }`}
          >
            <option value="" disabled>
              {placeholder || `Select ${label}`}
            </option>
            {options.map((option) => (
              <option key={option.value ?? "empty"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldState.error && (
            <span className={styles.errorText}>{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default AdminSelectController;
