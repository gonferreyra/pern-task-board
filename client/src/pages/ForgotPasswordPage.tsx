import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '../lib/api';
import Button from '../ui/Button';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const {
    mutate: sendPasswordReset,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md transform space-y-8 rounded-xl bg-white p-10 shadow-2xl transition-all hover:scale-105">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
        </div>
        {isError && (
          <div
            className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <span className="block sm:inline">{error.message}</span>
          </div>
        )}
        {isSuccess ? (
          <div
            className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
            role="alert"
          >
            <span className="block sm:inline">Password reset email sent</span>
          </div>
        ) : (
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              sendPasswordReset(email);
            }}
          >
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <Button
              isLoading={isPending}
              isDisabled={!email}
              text="Reset Password"
              loadingText="Sending..."
            />
          </form>
        )}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm">
            <Link
              to="/login"
              className="font-medium text-indigo-600 transition-colors duration-300 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-700">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-indigo-600 transition-colors duration-300 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
