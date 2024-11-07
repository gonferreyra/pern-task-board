import { useMutation, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskModal from '../components/TaskModal';
import Task from '../components/Task';
import queryClient from '../config/queryClient';
import { getUserTasks, logout } from '../lib/api';
import { Task as TaskType } from '../lib/types';
import useTaskStore from '../stores/taskStore';

function UserPage() {
  const navigate = useNavigate();

  // zustand state
  const taskModal = useTaskStore((state) => state.taskModal);
  const settingsMenu = useTaskStore((state) => state.settingsMenu);

  // zustand handlers
  const handleNewTask = useTaskStore((state) => state.handleNewTask);
  const handleEditTask = useTaskStore((state) => state.handleEditTask);
  const handleSettingsMenu = useTaskStore((state) => state.handleSettingsMenu);

  // get tasks from server
  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getUserTasks,
  });

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate('/login', { replace: true });
    },
  });

  useEffect(() => {
    document.body.style.overflow = taskModal ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [taskModal]);

  return (
    <>
      <div
        className={clsx(
          'my-12 px-4 sm:p-8 md:mx-auto md:max-w-lg lg:max-w-3xl',
          {
            'opacity-40': taskModal,
          },
        )}
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

          {isLoading && (
            <>
              <div className="flex animate-pulse gap-5 rounded-xl bg-gray-200 px-4 py-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300"></div>

                <div className="h-12 w-[100%] flex-1 items-center rounded-xl bg-gray-300"></div>
              </div>
              <div className="flex animate-pulse gap-5 rounded-xl bg-gray-200 px-4 py-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300"></div>

                <div className="h-12 w-[100%] flex-1 items-center rounded-xl bg-gray-300"></div>
              </div>
              <div className="flex animate-pulse gap-5 rounded-xl bg-gray-200 px-4 py-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300"></div>

                <div className="h-12 w-[100%] flex-1 items-center rounded-xl bg-gray-300"></div>
              </div>
            </>
          )}

          {data?.tasks?.map((task: TaskType) => (
            <Task
              key={task.id}
              {...task}
              status={
                task.status as 'completed' | 'in-progress' | 'wont-do' | 'to-do'
              }
              onEdit={() => handleEditTask(task.id, data)}
            />
          ))}

          {/* ADD task */}
          <div
            className="flex cursor-pointer gap-5 rounded-xl bg-[#F5E8D5] px-4 py-4 transition hover:scale-105"
            onClick={handleNewTask}
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
          <div
            className="relative"
            onMouseEnter={() => handleSettingsMenu(true)}
            onMouseLeave={() => handleSettingsMenu(false)}
          >
            <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Settings
            </button>
            {settingsMenu && (
              <div className="absolute -top-20 right-0 mt-2 w-24 overflow-hidden rounded-md border bg-white shadow-lg">
                <button
                  onClick={() => navigate('/settings')}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </button>
                <button
                  onClick={() => signOut()}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {taskModal && <TaskModal />}
    </>
  );
}

export default UserPage;
