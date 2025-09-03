import Providers from './providers';
import AppHeader from '@/components/organisms/AppHeader';
import './globals.css';

export const metadata = {
  title: 'TaskManagerApp',
  description: 'Tasks + Remote list',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <AppHeader />
          <main className="container">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
