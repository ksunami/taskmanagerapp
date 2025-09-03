'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '@/lib/features/tasks/tasksSlice';
import Modal from '@/components/atoms/Modal';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const MAX_LEN = 80;

type Task = { id: string; description: string };

// Estado mínimo que necesito del store (sin usar `any`)
type TasksSliceState = { items: Task[] };
type RootLikeState = { tasks?: TasksSliceState };

export default function TaskFormModal() {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  // Leo las tareas existentes para validar duplicados (tipado sin `any`)
  const tasks = useSelector<RootLikeState, Task[]>(
    (state) => state.tasks?.items ?? []
  );

  const handleOpen = () => {
    setDesc('');
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const isDuplicate = (text: string) => {
    const norm = text.trim().replace(/\s+/g, ' ').toLowerCase();
    return tasks.some(
      (t) => t.description.trim().replace(/\s+/g, ' ').toLowerCase() === norm
    );
  };

  const handleSave = () => {
    const trimmed = desc.trim();

    if (!trimmed) {
      setError('Please enter a task description.');
      return;
    }
    if (trimmed.length > MAX_LEN) {
      setError(`Task description must be at most ${MAX_LEN} characters.`);
      return;
    }
    if (isDuplicate(trimmed)) {
      setError('This task already exists.');
      return;
    }

    dispatch(addTask(trimmed));
    setDesc('');
    setError('');
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} className="btn-block">
        Add new task
      </Button>

      <Modal open={open} onClose={handleClose} title="Create Task">
        <div className="stack">
          <label htmlFor="task-desc" className="meta" style={{ fontWeight: 600 }}>
            Task description
          </label>

          <Input
            id="task-desc"
            placeholder="Task description"
            value={desc}
            maxLength={MAX_LEN}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDesc(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSave();
              }
            }}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'task-desc-error' : undefined}
          />

          {error && (
            <p id="task-desc-error" className="error" role="alert">
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
