import {
  IDataUser,
  ILoginResponse,
  IRegistrationType,
  ISigninType,
} from "@/api/api.type";
import { APP_REGISTERED_DATA, APP_TOKEN, APP_USER_INFO } from "@/constants";
import { generateFakeToken } from "@/helper";

// Removes authentication-related data from local storage
export const removeCookiesAuth = () => {
  removeFromLocalStorage([APP_TOKEN, APP_USER_INFO]);
};

// Sets the authentication token and user info in local storage
export const setTokenAuth = (data: ILoginResponse) => {
  try {
    localStorage.setItem(APP_TOKEN, generateFakeToken());
    const userInfo = {
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
    };
    saveToLocalStorage(APP_USER_INFO, userInfo);
  } catch (error) {
    handleError(`Error saving item to local storage: ${error}`);
  }
};

// Update user info (lastName and firstName)
export const updateUserInfo = (
  email: string,
  updatedUserData: Partial<IDataUser>
): boolean => {
  const existingData = checkRegisteredData();

  if (existingData) {
    const parsedData: IDataUser[] = JSON.parse(existingData);

    // Find the user with the matching email
    const updatedData = parsedData.map((user) => {
      if (user.email === email) {
        // Update lastName and firstName with the provided values
        return {
          ...user,
          lastName: updatedUserData.lastName || user.lastName,
          firstName: updatedUserData.firstName || user.firstName,
        };
      }
      return user;
    });

    // Save the updated data back to local storage
    saveToLocalStorage(APP_REGISTERED_DATA, updatedData);

    // Update user info in APP_USER_INFO as well
    const updatedUserInfo = {
      lastName: updatedUserData.lastName || parsedData[0].lastName,
      firstName: updatedUserData.firstName || parsedData[0].firstName,
      email,
    };
    saveToLocalStorage(APP_USER_INFO, updatedUserInfo);

    return true;
  }

  // Handle the case where existingData is null (no data to update)
  throw new Error("No user data found for the provided email.");
};

// Get the authentication token from local storage
export const getToken = (): string | null => {
  return getFromLocalStorage(APP_TOKEN);
};

// Get user data from local storage
export const getDataUser = (): string | null => {
  return getFromLocalStorage(APP_USER_INFO);
};

// Check if user data is registered
export const checkRegisteredData = (): string | null => {
  return getFromLocalStorage(APP_REGISTERED_DATA);
};

// Check if user data matches the provided credentials
export const checkDataInfo = (formData: ISigninType) => {
  const registeredData = checkRegisteredData();
  if (registeredData) {
    const parsedData = JSON.parse(registeredData);
    const dataUser = parsedData.find(
      (item: any) => item.email === formData.email
    );
    if (dataUser && dataUser.password === formData.password) {
      setTokenAuth(dataUser);
      return true;
    }
  }
  return false;
};

// Find user data by email
export const findDataInfo = (email: string) => {
  const registeredData = checkRegisteredData();
  if (registeredData) {
    const parsedData = JSON.parse(registeredData);
    return parsedData.find((item: any) => item.email === email) || null;
  }
  return null;
};

// Update registered user data
export const updateRegisteredData = (formData: IRegistrationType) => {
  const dataFormat: IDataUser = {
    email: formData.email,
    password: formData.password,
    lastName: formData.lastName,
    firstName: formData.firstName,
  };
  const existingData = checkRegisteredData();
  const newData = [
    ...(existingData ? JSON.parse(existingData) : []),
    dataFormat,
  ];
  saveToLocalStorage(APP_REGISTERED_DATA, newData);
};

// Helper function to save data to local storage
const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    handleError(`Error saving item to local storage: ${error}`);
  }
};

// Helper function to retrieve data from local storage
const getFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

// Helper function to remove items from local storage
const removeFromLocalStorage = (keys: string[]) => {
  keys.forEach((key) => localStorage.removeItem(key));
};

// Helper function to handle errors
const handleError = (errorMessage: string) => {
  throw new Error(errorMessage);
};
