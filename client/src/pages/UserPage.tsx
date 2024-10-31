import clsx from 'clsx';
import { useState } from 'react';
import Task from '../components/Task';
import EditTask from '../components/EditTask';
import { Link } from 'react-router-dom';
import { getUserTasks } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import { Task as TaskType } from '../lib/types';

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

function UserPage() {
  const [taskModal, setTaskModal] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [editTask, setEditTask] = useState<any>(null);
  const [status, setStatus] = useState<string>('');

  // get tasks from server
  const { data, isPending } = useQuery({
    queryKey: ['tasks'],
    queryFn: getUserTasks,
  });

  console.log(status);

  const handleEdit = (id: number) => {
    setTaskModal(true);
    // set task to edit
    const task = data.tasks.find((task: TaskType) => task.id === id);
    setEditTask(task);
    setStatus(data.tasks.find((task: TaskType) => task.id === id).status);
  };

  // const handleNewTask = () => {
  //   setTaskModal(true);
  //   setNewTask(true);
  // };

  const handleCloseModal = () => {
    setTaskModal(false);
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
          {/* {isPending && <div>Loading...</div>} */}

          {data?.tasks?.map((task: TaskType) => (
            <Task
              key={task.id}
              {...task}
              status={
                task.status as 'completed' | 'in-progress' | 'wont-do' | 'to-do'
              }
              onEdit={handleEdit}
            />
          ))}

          {/* {tasks.map((task) => (
            <Task
              key={task.id}
              {...task}
              status={
                task.status as 'completed' | 'in-progress' | 'wont-do' | 'to-do'
              }
              onEdit={handleEdit}
            />
          ))} */}

          {/* ADD task */}
          <div
            className="flex cursor-pointer gap-5 rounded-xl bg-[#F5E8D5] px-4 py-4 transition hover:scale-105"
            // onClick={handleNewTask}
          >
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
        <div className="fixed bottom-0 right-0 m-8">
          <Link
            to="/settings"
            className="rounded-full bg-custom-blue px-4 py-2 text-2xl text-white"
            onMouseOver={() => {
              const tooltip = document.getElementById('settings-tooltip');
              if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
              }
            }}
            onMouseOut={() => {
              const tooltip = document.getElementById('settings-tooltip');
              if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
              }
            }}
          >
            +
          </Link>
          <span
            id="settings-tooltip"
            className="absolute left-1/2 top-[-50px] -translate-x-1/2 transform rounded-lg bg-gray-500 p-2 text-white opacity-0 transition duration-300"
          >
            Settings
          </span>
        </div>
      </div>

      {taskModal && (
        <EditTask
          newTask={newTask}
          data={editTask}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}

export default UserPage;
