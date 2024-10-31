import { useEffect, useState } from 'react';
import StatusButton from '../ui/StatusButton';
import FormIcons from './FormIcons';

const buttons = [
  { value: 'in-progress', text: 'In Progress' },
  { value: 'completed', text: 'Completed' },
  { value: 'wont-do', text: 'Won"t Do' },
];

type EditTaskProps = {
  data: any;
  newTask: boolean;
  handleCloseModal: () => void;
};

function EditTask({ newTask, data, handleCloseModal }: EditTaskProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedButtons, setSelectedButtons] = useState<string | null>(null);
  console.log(selectedButtons);

  const handleButtonSelection = (value: string) => {
    setSelectedButtons(value);
  };

  const handleSelectIcon = (value: string) => {
    setSelectedIcon(value);
    console.log('Selected:', value); // Send to DB
  };

  useEffect(() => {
    if (!newTask) {
      setSelectedIcon(data.icon);
    }
  }, []);

  useEffect(() => {
    if (!newTask) {
      setSelectedButtons(data.status);
    }
  }, []);

  return (
    <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-[#00000033] p-8">
      <div className="flex h-[95%] w-full flex-col rounded-xl bg-white p-4 shadow-lg">
        <div className="flex justify-between">
          <h3 className="text-lg">Task details</h3>
          <button type="button" onClick={handleCloseModal}>
            x
          </button>
        </div>
        <form className="mt-6">
          <label htmlFor="name" className="text-sm text-custom-dark-grey">
            Task name
          </label>
          <input
            type="text"
            name="name"
            value={newTask ? '' : data.name}
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
            value={newTask ? '' : data.description}
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
                  isSelected={selectedButtons === button.value}
                  onSelect={handleButtonSelection}
                  text={button.text}
                />
              ))}
            </div>
          </div>
        </form>
        <div className="mt-auto flex justify-end gap-4">
          <button className="flex items-center gap-2 rounded-full bg-custom-dark-grey px-4 py-2 text-custom-bg-white">
            Delete
            <img src="/Trash.svg" />
          </button>
          <button className="flex items-center gap-2 rounded-full bg-custom-blue px-4 py-2 text-custom-bg-white">
            Save
            <img src="/Done_round.svg" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
