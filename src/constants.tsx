export const INPUT_CLASS_NAME =
  "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5";

export const EXPIRE_TOKEN_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
export const APP_REGISTERED_DATA = "appRegistrationData";
export const APP_TOKEN = "appToken";
export const APP_USER_INFO = "appUserInfo";
export const INPUT_MAX_LENGTH = 20;

export const ERROR_MESSAGES = {
  updateFailed: "Updated unsuccessful. Please try again later.",
  somethingWrong: "Something went wrong. Please try again later.",
  emailRequired: "Email is required",
  invalidEmailFormat:
    "Invalid email format. Please enter a valid email address.",
  emailExisted: "Email is already registered. Please use a different email.",
  confirmPasswordRequired: "Confirm password is required",
  passwordRequired: "Password is required",
  passwordNotMatch: "Passwords do not match. Please re-enter your password",
  invalidPasswordFormat:
    "Password must contain at least 12 characters, including uppercase, lowercase letters, numbers, and special characters.",
  invalidEmailOrPassword: "Invalid email or password. Please try again.",
  invalidFirstName: `First name is limited to ${INPUT_MAX_LENGTH} charaters maximum`,
  invalidLastName: `Last name is limited to ${INPUT_MAX_LENGTH} charaters maximum`,
  lastNameRequired: "Last name is required",
  firstNameRequired: "First name is required",
  invalidUsername: "Username does not exist, please check again!",
};
