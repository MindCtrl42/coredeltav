import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
  showHero?: boolean;
  className?: string;
}

export default function Layout({ children, showHero = false, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen ${className}`}>
      <Navbar />
      <main className={showHero ? '' : 'pt-14'}>{children}</main>
    </div>
  );
}
