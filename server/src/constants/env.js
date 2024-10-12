const getEnv = (key) => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

export const SERVER_PORT = getEnv('SERVER_PORT');
export const SERVER_HOSTNAME = getEnv('SERVER_HOSTNAME');

// DB
export const DB_NAME = getEnv('DB_NAME');
export const DB_HOST = getEnv('DB_HOST');
export const DB_PORT = getEnv('DB_PORT');
export const DB_USER = getEnv('DB_USER');
export const DB_PASSWORD = getEnv('DB_PASSWORD');

// JWT
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET');
