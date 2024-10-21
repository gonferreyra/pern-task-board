import API from '../config/apiClient';

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = LoginParams & {
  confirmPassword: string;
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
