import React from "react";
import styles from "./BaseInputField.module.css";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";

/**
 * Properties for the TextField component.
 *
 * @param type - The input type (e.g., "text", "password", etc.).
 * @param name - The name attribute of the input element, used to identify the form data after the form is submitted.
 * @param label - Text label for the input field.
 * @param testId - An identifier used for testing purposes.
 * @param control - The control object from react-hook-form for managing form state.
 * @param rules - Validation rules for the input field, based on react-hook-form's RegisterOptions.
 */
export interface IBaseInputFieldProps<T extends FieldValues> {
  type: "text" | "password" | "date" | "number";
  name: string;
  label: string;
  testId: string;
  control?: Control<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  placeholder?: string;
}
/**
 * TextField component is a controlled input element integrated with react-hook-form.
 * It utilizes the Controller component from react-hook-form to connect the input to the form state.
 * Props {@link ITextFieldProps}
 * */
const BaseInputField = <T extends FieldValues>({
  type,
  name,
  label,
  testId,
  control,
  rules,
  placeholder,
}: IBaseInputFieldProps<T>): React.JSX.Element => {
  return (
    <div className={styles.input_field_wrapper}>
      <label htmlFor={name}>{label}</label>

      <Controller
        name={name as Path<T>}
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
            />
            <br></br>
            {error && <span className={styles.error}>{error.message}</span>}
          </>
        )}
      />
    </div>
  );
};

export default BaseInputField;
