import { Link, useSearchParams } from 'react-router-dom';
import ResetPasswordForm from '../components/ResetPasswordForm';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const exp = Number(searchParams.get('exp'));
  const now = Date.now();
  const linkIsValid = code && exp > now;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md transform space-y-8 rounded-xl bg-white p-10 shadow-2xl transition-all hover:scale-105">
        <div className="text-center">
          {linkIsValid ? (
            <ResetPasswordForm code={code} />
          ) : (
            <>
              <div
                className="relative mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                role="alert"
              >
                <span className="block sm:inline">Invalid link</span>
              </div>
              <p className="mb-6">The link is either invalid or expired</p>
              <Link
                to="/password/forgot"
                className="text-indigo-600 transition-colors duration-300 hover:text-indigo-500"
              >
                Request a new password reset link
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
