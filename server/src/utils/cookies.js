import { fifteenMinutesFromNow, thirtyDaysFromNow } from './date.js';

const secure = process.env.NODE_ENV === 'production';

export const setAuthenticationCookies = ({
  res,
  accessToken,
  refreshToken,
}) => {
  return res
    .cookie('accessToken', accessToken, {
      sameSite: 'strict', // only send to the same site that made the request
      httpOnly: true, // prevent javascript access to cookie
      secure, // only send over https in production, not development
      expires: fifteenMinutesFromNow(),
    })
    .cookie('refreshToken', refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
      secure,
      expires: thirtyDaysFromNow(),
      path: '/auth/refresh',
    });
};

export const clearAuthenticationCookies = (res) => {
  return res.clearCookie('accessToken').clearCookie('refreshToken', {
    path: '/auth/refresh',
  });
};
