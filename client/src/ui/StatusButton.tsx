import { getImageUrl } from '../lib/utils';
import clsx from 'clsx';

type StatusButtonProps = {
  value: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
  text: string;
};

function StatusButton({
  value,
  isSelected,
  onSelect,
  text,
}: StatusButtonProps) {
  const handleClick = () => {
    onSelect(value);
  };

  return (
    <button
      type="button"
      value={value}
      className={clsx(
        'flex items-center gap-2 rounded-2xl border-2 p-[2px] transition',
        {
          'border-custom-blue': isSelected,
        },
      )}
      onClick={handleClick}
    >
      <img
        src={getImageUrl(value)}
        alt="icon-image"
        className={clsx(
          'flex h-12 w-12 items-center justify-center rounded-xl p-3',
          {
            'bg-[#E9A23B]': value === 'in-progress',
            'bg-[#32D657]': value === 'completed',
            'bg-[#DD524C]': value === 'wont-do',
          },
        )}
      />
      {text}
      {isSelected && (
        <img
          src="/Done_round.svg"
          alt="icon-image"
          className="ml-auto h-6 w-6 rounded-full bg-custom-blue p-1"
        />
      )}
    </button>
  );
}

export default StatusButton;
