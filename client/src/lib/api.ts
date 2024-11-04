import { AxiosResponse } from 'axios';
import API from '../config/apiClient';
import { Session } from './types';

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

export const logout = async () => {
  return API.get('/auth/logout');
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

export const getSessions = async (): Promise<Session[]> => {
  const response: AxiosResponse<Session[]> = await API.get('/sessions');
  return response.data;
};

export const deleteSession = async (id: number) => {
  const response = API.delete(`/sessions/${id}`);
  return response;
};

export const getUserTasks = async () => {
  const response = await API.get('/task');
  return response.data;
};

export const updateTask = async ({ id, data }: { id: number; data: any }) => {
  const response = await API.put(`/task/${id}`, data);
  return response.data;
};

export const createTask = async (data: any) => {
  const response = await API.post('/task', data);
  return response.data;
};
