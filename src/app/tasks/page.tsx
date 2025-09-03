'use client';
import TaskFormModal from '@/components/organisms/TaskFormModal';
import TaskList from '@/components/organisms/TaskList';

export default function TasksPage() {
  return (
    <section className="stack">
      <div className="card">
        <h2 style={{margin:'0 0 8px'}}>Tasks</h2>
        <p className="meta">Create tasks and see the list below</p>
        <div className="stack" style={{ marginTop: 12 }}>
          <TaskFormModal />
          <div className="spacer" />
          <TaskList />
        </div>
      </div>
    </section>
  );
}
