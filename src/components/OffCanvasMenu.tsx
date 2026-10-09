import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface OffCanvasMenuProps {
  open: boolean;
  onClose: () => void;
}

const menuLinks = [
  { label: 'About', href: '/' },
  { label: 'Archive', href: '/archive' },
  { label: 'Contact', href: '/contact' },
  { label: 'Shop', href: '/shop' },
];

const legalLinks = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Sitemap', href: '/sitemap' },
];

export default function OffCanvasMenu({ open, onClose }: OffCanvasMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsClosing(false);
      closeButtonRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else if (isVisible) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-foreground/20 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Panel */}
      <div
        ref={panelRef}
        className={`absolute top-0 left-0 h-full w-[280px] max-w-[80vw] bg-background ${isClosing ? 'animate-slide-out-left' : 'animate-slide-in-left'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="nav-height flex items-center justify-end page-padding border-b border-border">
            <Button variant="ghost"
              ref={closeButtonRef}
              onClick={onClose}
              className="h-auto p-0 text-xs uppercase hover:bg-transparent hover:opacity-60 transition-opacity"
              aria-label="Close menu"
            >
              Close
            </Button>
          </div>

          {/* Main Links */}
          <nav className="flex-1 py-8 page-padding overflow-y-auto">
            <ul className="space-y-4">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="text-sm uppercase hover:opacity-60 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>


          {/* Legal Links */}
          <div className="page-padding py-4 border-t border-border">
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Footer */}
          <div className="page-padding py-4">
            <p className="text-xs text-muted-foreground">© 2026 coredeltav</p>
          </div>
        </div>
      </div>
    </div>
  );
}
