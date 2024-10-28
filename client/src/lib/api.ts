import API from '../config/apiClient';

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = LoginParams & {
  confirmPassword: string;
};

type resetPasswordParams = {
  password: string;
  verificationCode: string;
};

export const login = async (data: LoginParams) => {
  const response = API.post('/auth/login', data);
  return response;
};

export const register = async (data: RegisterParams) => {
  const response = API.post('/auth/register', data);
  return response;
};

export const verifyEmail = async (verificationCode: string | undefined) => {
  const response = API.get(`/auth/email/verify/${verificationCode}`);
  return response;
};

export const sendPasswordResetEmail = async (email: string) => {
  const response = API.post('/auth/password/forgot', { email });
  return response;
};

export const resetPassword = async ({
  password,
  verificationCode,
}: resetPasswordParams) => {
  const response = API.post('/auth/password/reset', {
    password,
    verificationCode,
  });
  return response;
};

export const getUser = async () => {
  const response = API.get('/user');
  return response;
};
