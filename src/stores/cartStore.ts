import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/data/productData';
import { formatNPR, WHATSAPP_NUMBER } from '@/lib/currency';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  placeOrderRequest: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export function buildWhatsAppUrl(items: CartItem[]) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const lines = [
    'Hello! I would like to place an order request:',
    '',
    ...items.map((i, n) => `${n + 1}. ${i.title} — Qty: ${i.quantity} — ${formatNPR(i.price * i.quantity)}`),
    '',
    `Total: ${formatNPR(total)}`,
    '(Shipping to be calculated according to delivery location)',
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find(i => i.id === product.id);
        set({
          items: existing
            ? items.map(i => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i))
            : [...items, { id: product.id, title: product.title, price: product.price, image: product.images[0], quantity }],
        });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) return get().removeItem(id);
        set({ items: get().items.map(i => (i.id === id ? { ...i, quantity } : i)) });
      },
      removeItem: id => set({ items: get().items.filter(i => i.id !== id) }),
      clearCart: () => set({ items: [] }),
      setOpen: isOpen => set({ isOpen }),
      placeOrderRequest: () => {
        const { items } = get();
        if (items.length === 0) return;
        window.open(buildWhatsAppUrl(items), '_blank', 'noopener,noreferrer');
      },
      getTotalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
      getTotalPrice: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
    }),
    {
      name: 'coredeltav-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ items: state.items }),
    }
  )
);
