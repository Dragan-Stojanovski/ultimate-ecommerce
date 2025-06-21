import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import React from "react";
import type { IAuthenticateUserRequest } from "../../../domain/usecases/users/IAuthenticateUserRequest";
import { authenticateUser } from "../../../infra/http/api-calls/users/authenticateUser";
import SetMetaInfo from "../../../infra/utility/setMetaInfo";
import BaseInputField from "../../components/base/form-elements/base-input-field";
import BaseButton from "../../components/base/base-button";
import { fetchUserDirectly } from "../../../domain/store/actions/getUserOwn";
const LoginPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState<undefined | string>(undefined);
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<IAuthenticateUserRequest>({
    mode: "onChange",
  });

  /**
   * Asynchronously authenticates an user with the provided form data.
   * On successful authentications, redirects user to the home page.
   * In case of an error, sets an error message.
   *
   * @param data - {@link IAuthenticateUserRequest} The data used for the authentication.
   * @returns The result of the authentication process.
   */
  async function authenticateUserFn(data: IAuthenticateUserRequest) {
    try {
      const response = await authenticateUser(data);
      localStorage.setItem("jwt", response.data.token);
      fetchUserDirectly(dispatch);
      navigate("/");
    } catch (error: any) {
      setErrorMsg(
        error.response?.data.message ||
          "An error occurred during authentication."
      );
    }
  }

  return (
    <Fragment>
      <SetMetaInfo title="Login Page" description="Login" />
      <div className={styles.login_page__container}>
        <div className={styles.login_page__wrapper}>
          {errorMsg && <div className="errors_msg">{errorMsg}</div>}
          <div className={styles.login_page__header}>
            <h1>Log In</h1>
          </div>
          <form
            onSubmit={handleSubmit((formData) => {
              authenticateUserFn({
                username: formData.username,
                password: formData.password,
              });
            })}
          >
            <div className={styles.login_page__field}>
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

            <div className={styles.login_page__field}>
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
                    hasUppercase: (value: string) =>
                      /[A-Z]/.test(value) || "Include 1 uppercase",
                    hasLowercase: (value: string) =>
                      /[a-z]/.test(value) || "Include 1 lowercase",
                    hasNumber: (value: string) =>
                      /\d/.test(value) || "Include 1 number",
                    hasSymbol: (value: string) =>
                      /[@$!%*?&]/.test(value) || "Include 1 symbol",
                  },
                }}
              />
            </div>

            <div className={styles.login_page_btn}>
              <BaseButton type="submit" text="Log In" />
            </div>
            <div className={styles.already_authenticated_msg}>
              {" "}
              New? <Link to="/register">Join now</Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
