import SessionCard from '../components/SessionCard';
import { useSessions } from '../lib/hooks';
import { Session } from '../lib/types';

function UserSettings() {
  const { sessions, isPending, isSuccess, isError } = useSessions();
  return (
    <div className="mt-16 max-w-3xl px-10 py-4 sm:mx-auto sm:px-20">
      <h1 className="mb-6">My Sessions</h1>

      {isPending && <div>Loading...</div>}
      {isError && <p className="text-red-500">Failed to get sessions</p>}
      {isSuccess && (
        <div className="flex flex-col gap-3">
          {sessions?.map((session: Session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserSettings;
