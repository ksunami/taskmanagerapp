'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import TaskItem from '@/components/molecules/TaskItem';

export default function TaskList() {
  const items = useSelector((s: RootState) => s.tasks.items);
  if (!items.length) return <p className="meta">No tasks yet.</p>;
  return <ul className="list">{items.map(t => <TaskItem key={t.id} task={t} />)}</ul>;
}
