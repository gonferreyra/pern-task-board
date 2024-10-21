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
