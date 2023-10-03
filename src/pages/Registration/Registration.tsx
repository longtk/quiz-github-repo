import React, { useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import PopupRegister from "@/core/components/Popup/PopupRegister";
import LeftSide from "@/core/components/common/LeftSide/LeftSide";

import { patternValidateEmail, patternValidatePassword } from "@/helper";
import {
  ERROR_MESSAGES,
  INPUT_CLASS_NAME,
  INPUT_MAX_LENGTH,
} from "@/constants";
import { useLocalStorage } from "@/api/layer/useLocaleStorage";
import { IRegistrationType } from "@/api/api.type";
import Logo from "@/core/components/common/Logo/Logo";
import Label from "@/core/components/common/Form/Label/Label";
import ErrorMessage from "@/core/components/common/Form/ErrorMessage/ErrorMessage";

const Registration: React.FC = () => {
  const { updateDataUser, findDataUser } = useLocalStorage();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IRegistrationType>();

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [errorSignup, setErrorSignup] = useState<string>("");

  const onSubmit: SubmitHandler<IRegistrationType> = async (formData) => {
    let isError: boolean = false;

    if (formData.confirmPassword !== formData.password) {
      setError("confirmPassword", {
        type: "manual",
        message: ERROR_MESSAGES.passwordNotMatch,
      });
      isError = true;
    }

    // Check if the email already exists in localStorage
    if (findDataUser(formData.email)) {
      setError("email", {
        type: "manual",
        message: ERROR_MESSAGES.emailExisted,
      });
      isError = true;
    }

    if (_.isEmpty(errors) && !isError) {
      // Save the data to localStorage
      try {
        updateDataUser(formData);
        setShowPopup(true);
      } catch (error) {
        console.error(error);
        setErrorSignup(ERROR_MESSAGES.somethingWrong);
      }
    }
  };

  return (
    <>
      <section className="h-screen">
        <div className="h-full">
          <div className="g-6 h-full flex-wrap items-center justify-center md:flex lg:flex xl:flex ">
            <LeftSide />
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <Logo />
                  <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Create an account
                      </h1>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 md:space-y-6"
                        action="#"
                      >
                        {/* First Name Input */}
                        <div>
                          <Label htmlFor="firstName" text="First name" />
                          <input
                            {...register("firstName", {
                              required: ERROR_MESSAGES.firstNameRequired,
                              maxLength: {
                                value: INPUT_MAX_LENGTH,
                                message: ERROR_MESSAGES.invalidFirstName,
                              },
                            })}
                            aria-invalid={errors.firstName ? "true" : "false"}
                            type="text"
                            name="firstName"
                            required
                            className={`${INPUT_CLASS_NAME} ${
                              errors.firstName ? "border-error" : ""
                            }`}
                          />
                          {/* Display error message if first name validation fails */}
                          {errors.firstName?.message && (
                            <ErrorMessage message={errors.firstName.message} />
                          )}
                        </div>

                        {/* Last Name Input */}
                        <div>
                          <Label htmlFor="lastName" text="Last name:" />
                          <input
                            {...register("lastName", {
                              required: ERROR_MESSAGES.lastNameRequired,
                              maxLength: {
                                value: INPUT_MAX_LENGTH,
                                message: ERROR_MESSAGES.invalidLastName,
                              },
                            })}
                            aria-invalid={errors.lastName ? "true" : "false"}
                            type="text"
                            name="lastName"
                            required
                            className={`${INPUT_CLASS_NAME} ${
                              errors.lastName ? "border-error" : ""
                            }`}
                          />
                          {/* Display error message if last name validation fails */}
                          {errors.lastName?.message && (
                            <ErrorMessage message={errors.lastName.message} />
                          )}
                        </div>

                        {/* Email Input */}
                        <div>
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

                        {/* Password Input */}
                        <div>
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

                        {/* Confirm Password Input */}
                        <div>
                          <Label
                            htmlFor="confirm-password"
                            text="Confirm password"
                          />
                          <input
                            {...register("confirmPassword", {
                              required: ERROR_MESSAGES.confirmPasswordRequired,
                            })}
                            type="password"
                            name="confirmPassword"
                            id="confirm-password"
                            placeholder="••••••••"
                            className={`${INPUT_CLASS_NAME} ${
                              errors.confirmPassword ? "border-error" : ""
                            }`}
                            required
                          />
                          {/* Display error message if confirmPassword validation fails */}
                          {errors.confirmPassword?.message && (
                            <ErrorMessage
                              message={errors.confirmPassword.message}
                            />
                          )}
                        </div>

                        {/* Terms and Conditions Checkbox */}
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              aria-describedby="terms"
                              type="checkbox"
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                              required
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="terms"
                              className="font-light text-gray-500 "
                            >
                              I accept the{" "}
                              <span className="font-medium text-blue-600 hover:underline ">
                                Terms and Conditions
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Create an account
                        </button>

                        {/* Link to Login */}
                        <p className="text-sm font-light text-gray-500 ">
                          Already have an account?{" "}
                          <Link
                            to={{
                              pathname: "/",
                            }}
                            className="font-medium text-blue-600 hover:underline "
                          >
                            Login here
                          </Link>
                        </p>
                      </form>
                      {/* Display error message on signup failure */}
                      {errorSignup && <ErrorMessage message={errorSignup} />}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      {showPopup && <PopupRegister />}
    </>
  );
};

export default Registration;
