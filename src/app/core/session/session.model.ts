export interface User {
  displayName: string,
}

export type SessionStatus = "anonymous" | "authenticated";

export interface Credentials {
  email: string;
  password: string;
}
