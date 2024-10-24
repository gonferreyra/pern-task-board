import clsx from 'clsx';
import { getImageUrl } from '../lib/utils';

type TaskProps = {
  name: string;
  description?: string;
  icon: string;
  status: 'completed' | 'in-progress' | 'wont-do' | 'to-do';
};

function Task({ name, description, icon, status }: TaskProps) {
  return (
    <div
      className={clsx('flex gap-5 rounded-xl px-4 py-4', {
        'bg-[#f5d565]': status === 'in-progress',
        'bg-[#F7D4D3]': status === 'wont-do',
        'bg-[#A0ECB1]': status === 'completed',
        'bg-[#E3E8EF]': status === 'to-do',
      })}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F8FAFC]">
        {icon === 'clock' && '⏰'}
        {icon === 'weight' && '🏋️'}
        {icon === 'cofee' && '☕️'}
        {icon === 'books' && '📚'}
      </div>
      <div>
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
