import { useDeleteSessions } from '../lib/hooks';
import { Session } from '../lib/types';

function SessionCard({ session }: { session: Session }) {
  const { id, createdAt, userAgent, isCurrentSession } = session;
  const { deleteSession } = useDeleteSessions(id);
  return (
    <div className="flex rounded-md border p-4">
      <div className="w-full">
        <p className="mb-1 text-sm font-bold">
          {new Date(createdAt).toLocaleString('en-US')}
          {isCurrentSession && ' (current session)'}
        </p>
        <p className="text-xs text-custom-dark-grey">{userAgent}</p>
      </div>
      <div>
        {!isCurrentSession && (
          <button
            className="ml-4 self-center text-xl text-red-500"
            onClick={() => deleteSession()}
          >
            x
          </button>
        )}
      </div>
    </div>
  );
}

export default SessionCard;
