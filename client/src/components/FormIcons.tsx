type FormIconsProps = {
  selectedIcon: string | null;
  handleSelectedIcon: (value: string) => void;
};

function FormIcons({ selectedIcon, handleSelectedIcon }: FormIconsProps) {
  const icons = [
    { emoji: '👨‍💻', value: 'coding' },
    { emoji: '💬', value: 'chat' },
    { emoji: '☕', value: 'coffee' },
    { emoji: '🏋️', value: 'workout' },
    { emoji: '📚', value: 'study' },
    { emoji: '⏰', value: 'alarm' },
  ];

  return (
    <>
      <p className="mt-2 text-sm text-custom-dark-grey">Icon</p>
      <div className="my-2 flex gap-3">
        {icons.map((icon) => (
          <button
            type="button"
            key={icon.value}
            onClick={() => handleSelectedIcon(icon.value)}
            className={`flex h-6 w-6 items-center justify-center rounded-lg p-5 transition ${selectedIcon === icon.value ? 'bg-custom-light-orange' : 'bg-gray-100'}`}
          >
            {icon.emoji}
          </button>
        ))}
      </div>
    </>
  );
}

export default FormIcons;
