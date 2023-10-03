export const validateEmail = (email: string) => {
  // Check if the email matches the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  return isEmailValid;
};

export const generateFakeToken = () => {
  return Math.random().toString(36).substr(2); // remove `0.`
};

export const patternValidateEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export const patternValidatePassword = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/
);
