import { Icon } from '../lib/types';

type FormIconsProps = {
  selectedIcon: Icon | null;
  handleSelectedIcon: (icon: Icon) => void;
};

function FormIcons({ selectedIcon, handleSelectedIcon }: FormIconsProps) {
  const icons = [
    { id: 1, emoji: '👨‍💻', value: 'coding' },
    { id: 2, emoji: '💬', value: 'chat' },
    { id: 3, emoji: '☕', value: 'coffee' },
    { id: 4, emoji: '🏋️', value: 'workout' },
    { id: 5, emoji: '📚', value: 'study' },
    { id: 6, emoji: '⏰', value: 'alarm' },
  ];

  return (
    <>
      <p className="mt-2 text-sm text-custom-dark-grey">Icon</p>
      <div className="my-2 flex gap-3">
        {icons.map((icon) => (
          <button
            type="button"
            key={icon.id}
            onClick={() => handleSelectedIcon(icon)}
            className={`flex h-6 w-6 items-center justify-center rounded-lg p-5 transition ${selectedIcon?.id === icon.id ? 'bg-custom-light-orange' : 'bg-gray-100'}`}
          >
            {icon.emoji}
          </button>
        ))}
      </div>
    </>
  );
}

export default FormIcons;
