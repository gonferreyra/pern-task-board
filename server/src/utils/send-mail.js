import resend from '../config/resend.js';
import { NODE_ENV } from '../constants/env.js';

// function to make the email sender dynamic IF you have a domain and have set it up on resend -- not working on this project
// const getFromEmail = () =>
//   NODE_ENV === 'development' ? 'onboarding@resend.dev' : EMAIL_SENDER;
// ;

const getToEmail = (to) =>
  NODE_ENV === 'development' ? 'delivered@resend.dev' : to;

export const sendMail = async ({ to, subject, text, html }) => {
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: getToEmail(to),
      subject,
      text,
      html,
    });

    // console.log('Response from Resend:', response);

    if (!response || response.error) {
      throw response?.error || new Error('Unknown error');
    }

    return { data: response.data, error: null };
  } catch (error) {
    console.error('Exception caught:', err);
    return { data: null, error: err };
  }
};
