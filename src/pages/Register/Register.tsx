import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";

import Button from "../../ui/common/Button/Button.tsx";
import Input from "../../ui/common/Input/Input.tsx";

import { useRegisterUserMutation } from "../../queryClient/mutations/authentication.ts";

import { validateRegisterForm } from "../../utils/validation.ts";

import "./Register.css";

const Register = () => {
  const registerMutation = useRegisterUserMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const errors = validateRegisterForm(email, password, passwordConfirm);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registerMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
      },
    );
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-form-wrapper">
        <h1 className="register-form-title">Register</h1>
        <form className="register-form" onSubmit={onSubmit}>
          <Input
            id="email"
            name="Email"
            type="email"
            error={errors.email}
            placeholder="Email"
            focus={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            name="Password"
            type="password"
            error={errors.password}
            placeholder="Password"
            requirements="Your password must be between 8 and 32 characters long, and include at least one uppercase
          letter, one number, and one special character (e.g., !@#$%^&*)."
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            id="confirmPassword"
            name="Confirm Password"
            type="password"
            error={errors.confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {registerMutation.isError && <p>{registerMutation.error.message}</p>}
          <Button
            type="submit"
            title="Register"
            disabled={Boolean(
              errors.email ||
              errors.password ||
              errors.confirmPassword ||
              !email ||
              !password ||
              !passwordConfirm,
            )}
          />
        </form>
        <Link to="/login" className="register-page-redirect-link">
          Already have an account? Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;
