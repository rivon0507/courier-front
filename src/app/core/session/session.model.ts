export interface User {
  displayName: string,
}

export type SessionActivity = "login" | "register";

export interface Credentials {
  email: string;
  password: string;
}
