import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import LeftSide from "@/core/components/common/LeftSide/LeftSide";
import { ERROR_MESSAGES, INPUT_CLASS_NAME } from "@/constants";
import { useLocalStorage } from "@/api/layer/useLocaleStorage";
import { patternValidateEmail, patternValidatePassword } from "@/helper";
import { ISigninType } from "@/api/api.type";
import Label from "@/core/components/common/Form/Label/Label";
import ErrorMessage from "@/core/components/common/Form/ErrorMessage/ErrorMessage";
import Logo from "@/core/components/common/Logo/Logo";

const Login: React.FC = () => {
  const { checkDataUser } = useLocalStorage();
  // Initialize local state for error message display
  const [errorLogin, showErrorLogin] = useState<string>("");

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninType>();

  // Function to handle form submission
  const onSubmit: SubmitHandler<ISigninType> = (formData) => {
    try {
      // Check user data
      if (checkDataUser(formData)) {
        // Reload the page on successful login
        window.location.reload();
      } else {
        // Show an error message on invalid login attempt
        showErrorLogin(ERROR_MESSAGES.invalidEmailOrPassword);
      }
    } catch (error) {
      // Handle unexpected errors gracefully and show an error message
      console.log(error);
      showErrorLogin(ERROR_MESSAGES.somethingWrong);
    }
  };

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="g-6 h-full flex-wrap items-center justify-center md:flex lg:flex xl:flex ">
          <LeftSide />

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <section className="">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Logo />

                {/* Main login form */}
                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                      Sign in to your account
                    </h1>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4 md:space-y-6"
                      action="#"
                    >
                      <div>
                        {/* Label component for email input */}
                        <Label htmlFor="email" text="Your email" />
                        <input
                          {...register("email", {
                            required: ERROR_MESSAGES.emailRequired,
                            pattern: {
                              value: patternValidateEmail,
                              message: ERROR_MESSAGES.invalidEmailFormat,
                            },
                          })}
                          aria-invalid={errors.email ? "true" : "false"}
                          type="email"
                          name="email"
                          id="email"
                          className={`${INPUT_CLASS_NAME} ${
                            errors.email ? "border-error" : ""
                          }`}
                          placeholder="name@company.com"
                          required
                        />
                        {/* Display error message if email validation fails */}
                        {errors.email?.message && (
                          <ErrorMessage message={errors.email.message} />
                        )}
                      </div>
                      <div>
                        {/* Label component for password input */}
                        <Label htmlFor="password" text="Your password" />
                        <input
                          {...register("password", {
                            required: ERROR_MESSAGES.passwordRequired,
                            pattern: {
                              value: patternValidatePassword,
                              message: ERROR_MESSAGES.invalidPasswordFormat,
                            },
                          })}
                          aria-invalid={errors.password ? "true" : "false"}
                          type="password"
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className={`${INPUT_CLASS_NAME} ${
                            errors.email ? "border-error" : ""
                          }`}
                          required
                        />
                        {/* Display error message if password validation fails */}
                        {errors.password?.message && (
                          <ErrorMessage message={errors.password.message} />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="remember"
                              aria-describedby="remember"
                              type="checkbox"
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="remember"
                              className="text-gray-500 "
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Sign in
                      </button>
                      <p className="text-sm font-light text-gray-500 ">
                        Don’t have an account yet?{" "}
                        <Link
                          to={{
                            pathname: "/registration",
                          }}
                          className="font-medium text-blue-600 hover:underline "
                        >
                          Sign up
                        </Link>
                      </p>
                    </form>

                    {/* Display error message on login failure */}
                    {errorLogin && <ErrorMessage message={errorLogin} />}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
