import { useCallback } from "react";
import {
  getToken,
  getDataUser,
  checkRegisteredData,
  checkDataInfo,
  findDataInfo,
  updateRegisteredData,
  removeCookiesAuth,
  updateUserInfo,
} from "./auth";
import { IDataUser, IRegistrationType, ISigninType } from "../api.type";

export const useLocalStorage = () => {
  const token = getToken();

  const getUser = () => getDataUser();
  const checkData = () => checkRegisteredData();
  const checkDataUser = (formData: ISigninType) => checkDataInfo(formData);
  const findDataUser = (email: string) => findDataInfo(email);

  const updateDataUser = (formData: IRegistrationType) =>
    updateRegisteredData(formData);

  const updateInfo = (email: string, formData: Partial<IDataUser>) =>
    updateUserInfo(email, formData);

  const removeToken = useCallback(() => {
    removeCookiesAuth();
  }, []);

  return {
    updateInfo,
    getUser,
    checkData,
    checkDataUser,
    findDataUser,
    updateDataUser,
    removeToken,
    token,
  };
};
