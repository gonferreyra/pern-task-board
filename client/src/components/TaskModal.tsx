import { useEffect, useState } from 'react';
import StatusButton from '../ui/StatusButton';
import FormIcons from './FormIcons';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createTask, deleteTask, updateTask } from '../lib/api';
import queryClient from '../config/queryClient';
import toast from 'react-hot-toast';
import { createTaskSchema, updateTaskSchema } from '../lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import useTaskStore from '../stores/taskStore';

const buttons = [
  { value: 'in-progress', text: 'In Progress' },
  { value: 'completed', text: 'Completed' },
  { value: 'wont-do', text: 'Won"t Do' },
];

function TaskModal() {
  const newTask = useTaskStore((state) => state.newTask);
  const data = useTaskStore((state) => state.editTask);
  const handleCloseModal = useTaskStore((state) => state.handleCloseModal);

  const methods = useForm({
    defaultValues: newTask
      ? { name: '', description: '', icon: '' }
      : {
          name: data.name,
          description: data.description,
          icon: data.icon,
          status: data.status,
        },
    resolver: zodResolver(newTask ? createTaskSchema : updateTaskSchema),
  });

  const {
    register,
    setValue,
    formState: { errors },
  } = methods;

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedButtons, setSelectedButtons] = useState<string | null>(null);

  const { mutate: updateTaskMutation } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      // invalidate query to update tasks cache
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      handleCloseModal();
      toast.success('Task updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const { mutate: createTaskMutation } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      handleCloseModal();
      toast.success('Task created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const { mutate: deleteTaskMutation } = useMutation({
    mutationFn: () => deleteTask(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      handleCloseModal();
      toast.success('Task deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete task');
    },
  });

  const handleButtonSelection = (value: string) => {
    setSelectedButtons(value);
    setValue('status', value);
  };

  const handleSelectIcon = (value: string) => {
    setSelectedIcon(value);
  };

  const onSubmit = () => {
    if (newTask) {
      createTaskMutation(methods.getValues());
    } else {
      updateTaskMutation({ id: data.id, data: methods.getValues() });
    }
  };

  useEffect(() => {
    if (!newTask) {
      setSelectedIcon(data.icon);
      setSelectedButtons(data.status);
    }
  }, []);

  // Effect to show a toast for client-side validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors)
        .map((error) => error.message)
        .join(', ');

      toast.error(`Error: ${errorMessages}`);
    }
  }, [errors]);

  return (
    <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-[#00000033] p-8">
      <div className="flex max-h-[90vh] w-full flex-col overflow-y-auto rounded-xl bg-white p-4 shadow-lg md:mx-auto md:max-w-lg lg:max-w-3xl">
        <div className="flex justify-between">
          <h3 className="text-lg">Task details</h3>
          <button type="button" onClick={handleCloseModal}>
            x
          </button>
        </div>
        <FormProvider {...methods}>
          <form
            className="mt-6 flex flex-col gap-2"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <label htmlFor="name" className="text-sm text-custom-dark-grey">
              Task name
            </label>
            <input
              {...register('name')}
              type="text"
              onChange={(e) => setValue('name', e.target.value)}
              className="w-full rounded-xl border-2 border-custom-light-grey px-4 py-2 outline-none hover:border-custom-blue focus:border-custom-blue"
            />

            <label
              htmlFor="description"
              className="text-sm text-custom-dark-grey"
            >
              Description
            </label>
            <textarea
              {...register('description')}
              placeholder="Enter a short description"
              onChange={(e) => setValue('description', e.target.value)}
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
                    selectedButtons={selectedButtons}
                    onSelect={handleButtonSelection}
                    text={button.text}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              {!newTask && (
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full bg-custom-dark-grey px-4 py-2 text-custom-bg-white"
                  onClick={() => deleteTaskMutation()}
                >
                  Delete
                  <img src="/Trash.svg" />
                </button>
              )}
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-custom-blue px-4 py-2 text-custom-bg-white"
              >
                Save
                <img src="/Done_round.svg" />
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default TaskModal;
