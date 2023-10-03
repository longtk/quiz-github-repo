import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  ERROR_MESSAGES,
  INPUT_CLASS_NAME,
  INPUT_MAX_LENGTH,
} from "@/constants";
import { useLocalStorage } from "@/api/layer/useLocaleStorage";
import { IDataUser } from "@/api/api.type";
import Label from "@/core/components/common/Form/Label/Label";
import ErrorMessage from "@/core/components/common/Form/ErrorMessage/ErrorMessage";
import Logo from "@/core/components/common/Logo/Logo";

const UpdateInfo: React.FC = () => {
  const { getUser, updateInfo } = useLocalStorage();
  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState<IDataUser | null>(null);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Partial<IDataUser>>();

  useEffect(() => {
    // Retrieve user data from local storage and pre-fill the form
    const storedUserData = getUser();
    if (storedUserData) {
      const parsedData: IDataUser = JSON.parse(storedUserData);
      setDataUser(parsedData);
      setValue("lastName", parsedData.lastName);
      setValue("firstName", parsedData.firstName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to handle form submission
  const onSubmit: SubmitHandler<Partial<IDataUser>> = (formData) => {
    try {
      if (updateInfo(dataUser?.email!, formData)) {
        // Reset the form on successful update
        reset();
        // Redirect to the dashboard after successful update
        navigate("/dashboard");
      } else {
        // Show an error message on update failure
        setErrorInfo(ERROR_MESSAGES.updateFailed);
      }
    } catch (error) {
      // Handle unexpected errors gracefully and show an error message
      console.error(error);
      setErrorInfo(ERROR_MESSAGES.somethingWrong);
    }
  };

  return (
    <section className="">
      <Logo />
      <div className="">
        <div className="g-6  flex-wrap items-center justify-center md:flex lg:flex xl:flex ">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <section className="">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                      Update your info
                    </h1>
                    {/* Form for updating user info */}
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4 md:space-y-6"
                      action="#"
                    >
                      {/* Input for First Name */}
                      <div>
                        <Label htmlFor="firstName" text="First name:" />
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
                      {/* Input for Last Name */}
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

                      {/* Submit button */}
                      <button
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Update now
                      </button>
                    </form>

                    {/* Display error message on update failure */}
                    {errorInfo && <ErrorMessage message={errorInfo} />}
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

export default UpdateInfo;
