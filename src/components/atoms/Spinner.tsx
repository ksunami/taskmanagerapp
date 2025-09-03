export default function Spinner({ label='Loading...' }:{label?:string}) {
  return <div aria-busy="true" aria-live="polite">{label}</div>;
}
