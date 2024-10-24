import { useState } from 'react';
import StatusButton from '../ui/StatusButton';
import FormIcons from './FormIcons';
import { Icon } from '../lib/types';

const buttons = [
  { value: 'in-progress', text: 'In Progress' },
  { value: 'completed', text: 'Completed' },
  { value: 'wont-do', text: 'Won"t Do' },
];

function EditTask({ id }) {
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const handleButtonSelection = (index: number) => {
    if (selectedButtons.includes(index)) {
      setSelectedButtons([]);
    } else {
      setSelectedButtons([index]);
    }
  };

  const handleSelectIcon = (icon: Icon) => {
    setSelectedIcon(icon);
    console.log('Selected:', icon); // Send to DB
  };
  return (
    <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-[#00000033] p-8">
      <div className="w-full rounded-xl bg-white p-4 shadow-lg">
        <div className="flex justify-between">
          <h3 className="text-lg">Task details</h3>
          <button>x</button>
        </div>
        <form className="mt-6">
          <label htmlFor="name" className="text-sm text-custom-dark-grey">
            Task name
          </label>
          <input
            type="text"
            name="name"
            className="w-full rounded-xl border-2 border-custom-light-grey px-4 py-2 outline-none hover:border-custom-blue focus:border-custom-blue"
          />

          <label
            htmlFor="description"
            className="text-sm text-custom-dark-grey"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter a short description"
            className="h-32 w-full rounded-xl border-2 border-custom-light-grey px-4 py-2 outline-none hover:border-custom-blue focus:border-custom-blue"
          />
          <div>
            <FormIcons
              selectedIcon={selectedIcon}
              handleSelectedIcon={handleSelectIcon}
            />
          </div>
          <div>
            <p className="text-sm text-custom-dark-grey">Status</p>
            <div className="grid grid-cols-1 grid-rows-3 gap-2 sm:grid-cols-2 sm:grid-rows-2">
              {buttons.map((button, index) => (
                <StatusButton
                  key={index}
                  value={button.value}
                  index={index}
                  isSelected={selectedButtons?.includes(index)}
                  onSelect={handleButtonSelection}
                  text={button.text}
                />
              ))}
            </div>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
