import Link from 'next/link';

export default function Home() {
  return (
    <section className="stack">
      <div className="card">
        <h1 style={{margin:'0 0 8px'}}>TaskManagerApp</h1>
        <p className="meta">Choose a section to continue</p>
        <div className="stack" style={{ marginTop: 12 }}>
          <Link className="btn btn-primary btn-block" href="/tasks">Tasks</Link>
          <Link className="btn btn-secondary btn-block" href="/listado">Remote List</Link>
        </div>
      </div>
    </section>
  );
}
