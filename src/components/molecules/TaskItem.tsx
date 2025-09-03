import { Task } from '@/lib/features/tasks/types';

export default function TaskItem({ task }: { task: Task }) {
  return <li className="list-item">{task.description}</li>;
}
