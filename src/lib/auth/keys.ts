export const keys = {
  session: (sid: string) => `session:{${sid}}`,
  access: (sid: string) => `session:{${sid}}:access`,
  refresh: (sid: string) => `session:{${sid}}:refresh`,
  lock: (sid: string) => `session:{${sid}}:lock`,
};
