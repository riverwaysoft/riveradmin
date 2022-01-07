export type DefaultAdminApiClient = {
  loginAdmin: (username: string, password: string) => Promise<{ token: string }>;
};
