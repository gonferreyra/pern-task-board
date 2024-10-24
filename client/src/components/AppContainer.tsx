import { useState } from 'react';
import Task from './Task';
import clsx from 'clsx';
import FormIcons from './FormIcons';
import { Icon } from '../lib/types';
import StatusButton from '../ui/StatusButton';
import EditTask from './EditTask';

export const tasks = [
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

function AppContainer() {
  const [taskModal, setTaskModal] = useState(false);
  // const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);
  // const [selectedButtons, setSelectedButtons] = useState<number[]>([]);
  const [edit, setEdit] = useState<number>();

  // const handleSelectIcon = (icon: Icon) => {
  //   setSelectedIcon(icon);
  //   console.log('Selected:', icon); // Send to DB
  // };

  // const handleButtonSelection = (index: number) => {
  //   if (selectedButtons.includes(index)) {
  //     setSelectedButtons([]);
  //   } else {
  //     setSelectedButtons([index]);
  //   }
  // };

  const handleEdit = (id: number) => {
    console.log('Edita task', id);
    setEdit(id);
  };

  return (
    <>
      <div
        className={clsx('my-12 px-4 sm:p-8', {
          'opacity-50': taskModal,
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
              onEdit={handleEdit}
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

      {edit && <EditTask id={edit} />}
    </>
  );
}

export default AppContainer;
