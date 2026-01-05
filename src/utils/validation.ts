import type {
  LoginValidationErrorsType,
  RegisterValidationErrorsType,
} from "../types/validation.ts";

export const validateRegisterForm = (
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const errors: RegisterValidationErrorsType = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else {
    if (password.length < 8 || password.length > 32) {
      errors.password = "Password must be between 8 and 32 characters long";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = "Password must contain at least one special character";
    }
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateLoginForm = (email: string, password: string) => {
  const errors: LoginValidationErrorsType = {
    email: "",
    password: "",
  };

  if (!email) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
};
