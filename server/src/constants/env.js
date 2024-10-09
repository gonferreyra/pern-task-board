const getEnv = (key) => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

export const SERVER_PORT = getEnv('SERVER_PORT');
export const SERVER_HOSTNAME = getEnv('SERVER_HOSTNAME');
