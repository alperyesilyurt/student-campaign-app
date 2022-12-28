export type User = {
  name: string;
  email: string;
};

export type AuthState = {
  isLoggedIn: boolean;
  user?: User;
};
