import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../lib/api';

type ResetPasswordProps = {
  code: string;
};

function ResetPasswordForm({ code }: ResetPasswordProps) {
  const [password, setPassword] = useState('');

  const {
    mutate: resetUserPassword,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: resetPassword,
  });

  return (
    <>
      <h2 className="mb-8 text-4xl">Change your password</h2>
      <div className="">
        {isError && (
          <div
            className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <span className="block sm:inline">{error.message}</span>
          </div>
        )}
        {isSuccess ? (
          <>
            <div
              className="relative mb-6 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
              role="alert"
            >
              <span className="block sm:inline">
                Password updated succesfully!
              </span>
            </div>
            <Link
              to="/login"
              className="text-indigo-600 transition-colors duration-300 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              resetUserPassword({ password, verificationCode: code });
            }}
          >
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    resetUserPassword({ password, verificationCode: code })
                  }
                />
                <Button
                  isDisabled={!password}
                  isLoading={isPending}
                  text="Reset password"
                  loadingText="Loading..."
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default ResetPasswordForm;
