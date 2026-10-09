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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border text-foreground">
        <nav className="nav-height flex items-center justify-between page-padding">
          {/* Left - Menu button */}
          <Button variant="ghost"
            onClick={() => setMenuOpen(true)}
            className="h-auto p-0 text-xs uppercase hover:bg-transparent hover:opacity-60 transition-opacity"
            aria-label="Open menu"
          >
            Menu
          </Button>

          {/* Center - Logo */}
          <Link 
            to="/" 
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Logo />
          </Link>

          {/* Right - Actions */}
          <div className="flex items-center gap-4">
            {!isCommercePage && (
              <Link
                to="/archive"
                className="text-xs uppercase hover:opacity-60 transition-opacity"
              >
                Archive
              </Link>
            )}
            {isCommercePage && <Button variant="ghost"
              onClick={() => setCartOpen(true)}
              className="h-auto p-0 text-xs uppercase hover:bg-transparent hover:opacity-60 transition-opacity"
              aria-label="Cart"
            >
              Cart{totalItems > 0 && ` (${totalItems})`}
            </Button>}
          </div>
        </nav>
      </header>

      <OffCanvasMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {isCommercePage && <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />}
    </>
  );
}
