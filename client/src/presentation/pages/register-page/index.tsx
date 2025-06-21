import { useForm } from "react-hook-form";
import styles from "./RegisterPage.module.css";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BaseInputField from "../../components/base/form-elements/base-input-field";
import BaseButton from "../../components/base/base-button";
import React from "react";
import type { IRegisterUserRequestBody } from "../../../domain/usecases/users/IRegisterUserRequestBody";
import { registerNewUser } from "../../../infra/http/api-calls/users/registerUser";
import SetMetaInfo from "../../../infra/utility/setMetaInfo";

/**
 * Interface representing the fields of the registration form.
 *
 * @param email - The email address of the user.
 * @param username - The username for the user's account.
 * @param password - The password for the user's account.
 * @param repeatPassword - An optional field for repeating the password, used for validation.
 */
export interface IRegisterFormFields {
  email: string;
  username: string;
  password: string;
  repeatPassword?: string;
}

/**
 * Represents the registration page component where users can create a new account.
 * This component handles user input for registration and manages the state
 * for success and error messages. It uses `registerUserFn` to perform the actual
 * registration of the user.
 *
 * @returns The JSX.Element representing the registration page.
 */
const RegisterPage: React.FC = (): React.JSX.Element => {
  const { handleSubmit, control, watch, trigger, formState } =
    useForm<IRegisterFormFields>({
      mode: "onChange",
    });
  const [errorMsg, setErrorMsg] = useState<undefined | string>(undefined);
  const [successMsg, setSuccessMsg] = useState<undefined | string>(undefined);
  const navigate = useNavigate();

  /**
   * Asynchronously registers a new user with the provided form data.
   * On successful registration, displays a success message.
   * In case of an error, sets an error message.
   *
   * @param data - {@link IRegisterUserRequestBody} The data from the registration form.
   * @returns The result of the registration process.
   */
  async function registerUserFn(data: IRegisterUserRequestBody) {
    console.log("Register Data", data);

    try {
      await registerNewUser(data);
      setSuccessMsg("Registration successful!");
      setTimeout(() => {
        setSuccessMsg(undefined);
        navigate("/signin");
      }, 3000);
    } catch (error: any) {
      setErrorMsg(
        error.response?.data.message || "An error occurred during registration."
      );
    }
  }
  const [searchParams] = useSearchParams();
  const packageType = searchParams.get("package");
  const passwordField = watch("password");

  useEffect(() => {
    if (formState.dirtyFields.repeatPassword) {
      trigger("repeatPassword");
    }
  }, [passwordField]);

  useEffect(() => {
    console.log("packageType ---->", packageType);
  }, [packageType]);

  return (
    <Fragment>
      <SetMetaInfo title="Register Page" description="Welcome Get Started" />

      <div className={styles.register_page_container}>
        <h1>Oman Labor Market Analysis</h1>
        <h3>Make your account</h3>
        <div className={styles.register_page_wrapper}>
          {successMsg && <div className={styles.success_msg}>{successMsg}</div>}
          {errorMsg && successMsg === undefined && (
            <div className="errors_msg">{errorMsg}</div>
          )}
          <div className={styles.register_page__header}>
            <p className={styles.get_started__text}>
              Just need a few things to get you going
            </p>
          </div>
          <form
            onSubmit={handleSubmit((formData) => {
              registerUserFn({
                email: formData.email,
                username: formData.username,
                password: formData.password,
                packageType: packageType ?? "",
              });
            })}
          >
            <div className={styles.register_page__field}>
              <BaseInputField
                name="email"
                type="text"
                label="Email"
                testId="registerEmailField"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
              />
            </div>

            {/* <div className={styles.register_page__field}>
							<BaseTextField
								name="organization"
								type="text"
								label="Organization"
								testId="registerOrganizationField"
								control={control}
								rules={{
									required: "Organization is required",
								}}
							/>
						</div> */}

            <div className={styles.register_page__field}>
              <BaseInputField
                name="username"
                type="text"
                label="Username"
                testId="registerUsernameField"
                control={control}
                rules={{
                  required: "Required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 chars",
                  },
                  maxLength: {
                    value: 15,
                    message: "Maximum 15 chars",
                  },
                }}
              />
            </div>
            <div className={styles.register_page__field}>
              <BaseInputField
                name="password"
                type="password"
                label="Password"
                testId="registerPasswordField"
                control={control}
                rules={{
                  required: "Required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 chars",
                  },
                  maxLength: {
                    value: 15,
                    message: "Maximum 15 chars",
                  },
                  validate: {
                    hasUppercase: (value: string | undefined) =>
                      (value && /[A-Z]/.test(value)) || "Include 1 uppercase",
                    hasLowercase: (value: string | undefined) =>
                      (value && /[a-z]/.test(value)) || "Include 1 lowercase",
                    hasNumber: (value: string | undefined) =>
                      (value && /\d/.test(value)) || "Include 1 number",
                    hasSymbol: (value: string | undefined) =>
                      (value && /[@$!%*?&]/.test(value)) || "Include 1 symbol",
                  },
                }}
              />
            </div>
            <div className={styles.register_page__field}>
              <BaseInputField
                name="repeatPassword"
                type="password"
                label="Repeat Password"
                testId="registerRepeatPasswordField"
                control={control}
                rules={{
                  required: "Required",
                  validate: {
                    matchesPassword: (value: string | undefined) =>
                      value === control._formValues.password ||
                      "Must match password",
                  },
                }}
              />
            </div>
            <div className={styles.register_page_btn}></div>
            <div className={styles.already_registered_msg}>
              Already have an account<Link to="/signin"> Sign in</Link>{" "}
            </div>
            <br></br>
            <BaseButton type="submit" text="Register" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterPage;
