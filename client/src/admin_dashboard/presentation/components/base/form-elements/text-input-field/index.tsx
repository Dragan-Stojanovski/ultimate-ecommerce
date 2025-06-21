import styles from "./TextInputField.module.css";
import { Controller } from "react-hook-form";
import type { Control, RegisterOptions } from "react-hook-form";

export interface ITextInputFieldProps {
  type: "text" | "password" | "date" | "number";
  name?: string;
  label?: string;
  testId?: string;
  control?: Control;
  rules?: RegisterOptions;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInputField = ({
  type,
  name,
  label,
  testId,
  control,
  rules,
  placeholder,
  value,
  onChange,
}: ITextInputFieldProps): React.JSX.Element => {
  const inputField = (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      data-testid={testId}
      className={styles.input}
    />
  );

  return (
    <div className={styles.input_field_wrapper}>
      {label && <label htmlFor={name}>{label}</label>}

      {control && name ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <>
              <input
                type={type}
                placeholder={placeholder}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={ref}
                data-testid={testId}
                className={styles.input}
              />
              {error && <span className={styles.error}>{error.message}</span>}
            </>
          )}
        />
      ) : (
        inputField
      )}
    </div>
  );
};

export default TextInputField;