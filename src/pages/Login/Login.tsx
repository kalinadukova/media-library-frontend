import { Link, useNavigate } from "react-router";

import Button from "../../ui/common/Button/Button.tsx";
import Input from "../../ui/common/Input/Input.tsx";

import { useUserStore } from "../../store/user.ts";

import "./Login.css";
import { useLoginUserMutation } from "../../queryClient/mutations/authentication.ts";
import { type FormEvent, useState } from "react";
import { validateLoginForm } from "../../utils/validation.ts";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../../types/user.ts";

const Login = () => {
  const loginMutation = useLoginUserMutation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errors = validateLoginForm(email, password);

  const updateUser = useUserStore((action) => action.updateUser);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data: any) => {
          const decodedToken: DecodedToken = jwtDecode(data.token);

          updateUser({
            id: decodedToken.sub_id,
            email: decodedToken.sub,
            token: data.token,
          });

          navigate("/");
        },
      },
    );
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-form-wrapper">
        <h1 className="login-form-title">Login</h1>
        <form className="login-form" onSubmit={onSubmit}>
          <Input
            id="email"
            name="Email"
            type="email"
            error={errors.email}
            placeholder={errors.email}
            focus={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            name="Password"
            type="password"
            error={errors.password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginMutation.isError && <p>{loginMutation.error.message}</p>}
          <Button type="submit" title="Login" />
        </form>
        <Link to="/register" className="login-page-redirect-link">
          Don’t have an account? Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
