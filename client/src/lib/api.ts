import API from '../config/apiClient';

type LoginParams = {
  email: string;
  password: string;
};

export const login = async (data: LoginParams) => {
  const response = API.post('/auth/login', data);
  return response;
};
