import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import OffCanvasMenu from './OffCanvasMenu';
import CartDrawer from './CartDrawer';
import Logo from './Logo';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore(state => state.getTotalItems());
  const setCartOpen = useCartStore(state => state.setOpen);
  const cartOpen = useCartStore(state => state.isOpen);
  const location = useLocation();
  
  const isCommercePage = location.pathname === '/shop' || location.pathname.startsWith('/shop/') || location.pathname === '/cart';
  const isWorkDetailPage = location.pathname.startsWith('/work/');
  const isAboutPage = location.pathname === '/';
  const isDarkPage = isWorkDetailPage || isAboutPage || location.pathname === '/contact';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-colors duration-300 ${
        isDarkPage
          ? 'bg-black/90 border-b border-neutral-900 text-white'
          : 'bg-background/95 border-b border-border text-foreground'
      }`}>
        <nav className="nav-height flex items-center justify-between page-padding">
          {/* Left - Menu button */}
          <Button variant="ghost"
            onClick={() => setMenuOpen(true)}
            className={`h-auto p-0 text-xs uppercase hover:bg-transparent transition-opacity ${
              isDarkPage ? 'text-white hover:text-neutral-400' : 'text-foreground hover:opacity-60'
            }`}
            aria-label="Open menu"
          >
            Menu
          </Button>

          {/* Center - Logo */}
          <Link 
            to="/" 
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Logo className={isDarkPage ? 'text-white' : ''} />
          </Link>

          {/* Right - Actions */}
          <div className="flex items-center gap-4">
            {(!isCommercePage || totalItems === 0) && (
              <Link
                to="/archive"
                className={`text-xs uppercase transition-opacity ${
                  isDarkPage ? 'text-white hover:text-neutral-400' : 'hover:opacity-60'
                }`}
              >
                Archive
              </Link>
            )}
            {isCommercePage && totalItems > 0 && (
              <Button variant="ghost"
                onClick={() => setCartOpen(true)}
                className="h-auto p-0 text-xs uppercase hover:bg-transparent hover:opacity-60 transition-opacity"
                aria-label="Cart"
              >
                Cart ({totalItems})
              </Button>
            )}
          </div>
        </nav>
      </header>

      <OffCanvasMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {isCommercePage && <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />}
    </>
  );
}
