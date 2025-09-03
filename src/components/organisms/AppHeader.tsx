'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length <= 2) {
      router.push('/');
    } else {
      router.back();
    }
  };

  return (
    <header className="app-header">
      {!isHome && (
        <button className="icon-btn" aria-label="Go back" onClick={goBack}>←</button>
      )}
      <Link href="/" className="brand">TaskManagerApp</Link>
      <nav className="nav">
        <Link href="/tasks" className={`nav-link ${pathname==='/tasks' ? 'active' : ''}`}>Tasks</Link>
        <Link href="/listado" className={`nav-link ${pathname==='/listado' ? 'active' : ''}`}>Remote</Link>
      </nav>
    </header>
  );
}
