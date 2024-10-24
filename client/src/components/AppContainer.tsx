import { useState } from 'react';
import Task from './Task';
import clsx from 'clsx';
import FormIcons from './FormIcons';
import { Icon } from '../lib/types';
import StatusButton from '../ui/StatusButton';

const tasks = [
  {
    id: 1,
    name: 'Task in Progress',
    icon: 'clock',
    status: 'in-progress',
  },
  {
    id: 2,
    name: 'Task Completed',
    icon: 'weight',
    status: 'completed',
  },
  {
    id: 3,
    name: 'Task Won"t Do',
    icon: 'cofee',
    status: 'wont-do',
  },
  {
    id: 4,
    name: 'Task To Do',
    description: 'Work on a Challenge on devChallenges.io, learn TypeScript.',
    icon: 'books',
    status: 'to-do',
  },
];

const buttons = [
  { value: 'in-progress', text: 'In Progress' },
  { value: 'completed', text: 'Completed' },
  { value: 'wont-do', text: 'Won"t Do' },
];

function AppContainer() {
  const [newTaskModal, setNewTaskModal] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const handleSelectIcon = (icon: Icon) => {
    setSelectedIcon(icon);
    console.log('Selected:', icon); // Send to DB
  };

  const handleButtonSelection = (index: number) => {
    if (selectedButtons.includes(index)) {
      setSelectedButtons([]);
    } else {
      setSelectedButtons([index]);
    }
  };

  return (
    <>
      <div
        className={clsx('my-12 px-4 sm:p-8', {
          'opacity-50': newTaskModal,
        })}
      >
        <header>
          <div className="flex gap-4">
            <img src="/Logo.svg" alt="logo" className="self-start" />
            <div>
              <div className="flex gap-2">
                <h2 className="text-4xl">My Task Board</h2>
                <img src="/Edit_duotone.svg" alt="pencil-image" />
              </div>
              <p className="text-sm font-medium">Tasks to keep organised</p>
            </div>
          </div>
        </header>
        {/* If is logged in, show tasks, if not show link to login or register */}
        <main className="my-12 flex flex-col gap-4">
          {tasks.map((task) => (
            <Task
              key={task.id}
              {...task}
              status={
                task.status as 'completed' | 'in-progress' | 'wont-do' | 'to-do'
              }
            />
          ))}

          {/* ADD task */}
          <div className="flex cursor-pointer gap-5 rounded-xl bg-[#F5E8D5] px-4 py-4 transition hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#E9A23B]">
              <img src="/Add_round_duotone.svg" alt="add-image" />
            </div>
            <div>
              <h3 className="flex min-h-[45px] items-center text-xl font-semibold">
                Add new task
              </h3>
            </div>
          </div>
        </main>
      </div>

      {newTaskModal && (
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
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AppContainer;
