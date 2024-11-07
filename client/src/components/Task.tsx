import clsx from 'clsx';
import { getImageUrl } from '../lib/utils';

type TaskProps = {
  id: number; // change to string to use DB
  name: string;
  description?: string;
  icon: string;
  status: 'completed' | 'in-progress' | 'wont-do' | 'to-do';
  onEdit: (id: number) => void;
};

function Task({ id, name, description, icon, status, onEdit }: TaskProps) {
  return (
    <div
      className={clsx('flex cursor-pointer gap-5 rounded-xl px-4 py-4', {
        'bg-[#f5d565]': status === 'in-progress',
        'bg-[#F7D4D3]': status === 'wont-do',
        'bg-[#A0ECB1]': status === 'completed',
        'bg-[#E3E8EF]': status === 'to-do',
      })}
      onClick={() => onEdit(id)}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F8FAFC]">
        {icon === 'alarm' && '⏰'}
        {icon === 'workout' && '🏋️'}
        {icon === 'coffee' && '☕️'}
        {icon === 'study' && '📚'}
        {icon === 'coding' && '👨‍💻'}
        {icon === 'chat' && '💬'}
      </div>
      <div className="max-w-[280px]">
        <h3 className="flex min-h-[45px] items-center text-xl font-semibold">
          {name}
        </h3>
        {description && <p>{description}</p>}
      </div>
      <div className="ml-auto flex h-12 w-12 items-center justify-center">
        {status !== 'to-do' && (
          <img
            src={getImageUrl(status)}
            alt="status"
            className={clsx('h-12 w-12 rounded-lg p-3', {
              'bg-[#E9A23B]': status === 'in-progress',
              'bg-[#32D657]': status === 'completed',
              'bg-[#DD524C]': status === 'wont-do',
            })}
          />
        )}
      </div>
    </div>
  );
}

export default Task;
