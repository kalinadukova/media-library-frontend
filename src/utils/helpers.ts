import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/user.ts";

export const useLogout = () => {
  const logoutUser = useUserStore((state) => state.logoutUser);
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    logoutUser();
  };
};
