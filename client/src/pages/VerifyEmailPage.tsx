import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { verifyEmail } from '../lib/api';

function VerifyEmailPage() {
  const { code } = useParams();

  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ['emailVerification', code],
    queryFn: () => verifyEmail(code),
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md transform space-y-8 rounded-xl bg-white p-10 shadow-2xl transition-all hover:scale-105">
        {isPending ? (
          <div className="flex flex-col items-center gap-6">Loading...</div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div
              className={`alert ${
                isSuccess
                  ? 'border-green-500 bg-green-100'
                  : 'border-red-500 bg-red-100'
              } rounded-lg px-6 py-4`}
            >
              <div className="flex items-center">
                {isSuccess ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414l2-2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="ml-2">
                  {isSuccess ? 'Email verified!' : 'Invalid link'}
                </span>
              </div>
            </div>
            {isError && (
              <p className="text-gray-400">
                The link is either invalid or expired.{' '}
                <Link
                  to="/password/reset"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Get a new link
                </Link>
              </p>
            )}
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
