import RemoteList from '@/components/organisms/RemoteList';

export default function ListadoPage() {
  return (
    <section className="stack">
      <div className="card">
        <h2 style={{margin:'0 0 8px'}}>Remote List</h2>
        <p className="meta">Data fetched from an external endpoint</p>
        <div className="spacer" />
        <RemoteList />
      </div>
    </section>
  );
}
