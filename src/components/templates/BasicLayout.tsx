export default function BasicLayout({ children }: {children: React.ReactNode}) {
  return <main className="container" style={{maxWidth: 900, margin: '2rem auto', padding: '0 1rem'}}>{children}</main>;
}