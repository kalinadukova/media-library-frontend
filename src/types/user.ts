import type { JwtPayload } from "jwt-decode";

export type User = {
  id: string;
  token: string;
  email: string | undefined;
};

export type UserStore = {
  user: User;
  updateUser: (user: User) => void;
  logoutUser: () => void;
};

export type DecodedToken = {
  sub_id: string;
} & JwtPayload;
