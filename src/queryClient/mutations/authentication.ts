import { useMutation } from "@tanstack/react-query";

import { loginRequest, registerRequest } from "../../api/authentication.ts";

const useAuthMutation = (authFn: any) =>
  useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return authFn(email, password);
    },
  });

export const useRegisterUserMutation = () => useAuthMutation(registerRequest);
export const useLoginUserMutation = () => useAuthMutation(loginRequest);
