export type RegisterValidationErrorsType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginValidationErrorsType = {
  email: string;
  password: string;
};

export type TagOption = {
  label: string;
  value: string;
};
