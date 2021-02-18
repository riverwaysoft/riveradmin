export type AdminApiClient = {
  loginAdmin: (username: string, password: string) => Promise<{ token: string }>;
};
