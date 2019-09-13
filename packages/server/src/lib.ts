export function env(key: string): string {
  const value = process.env[key];
  if(value) {
    return value;
  } else {
    throw new Error(`missing environment variable: ${key}`);
  }
};
