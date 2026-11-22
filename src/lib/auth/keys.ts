export const keys = {
  access: (sid: string) => `session:${sid}:access`,
  refresh: (sid: string) => `session:${sid}:refresh`,
  lock: (sid: string) => `session:${sid}:lock`,
};
