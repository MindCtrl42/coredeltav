import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/data/productData';
import { CustomerOrderDetails, getWhatsAppOrderUrl, CartItemLike } from '@/lib/whatsapp';
import { useCustomerStore } from './customerStore';

export interface CartItem extends CartItemLike {
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
  placeOrderRequest: (customer?: Partial<CustomerOrderDetails>) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export function buildWhatsAppUrl(items: CartItem[], customer?: Partial<CustomerOrderDetails>) {
  const currentCustomer = customer || useCustomerStore.getState().customer;
  return getWhatsAppOrderUrl(items, currentCustomer);
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
      placeOrderRequest: (customer) => {
        const { items } = get();
        if (items.length === 0) return;
        const targetCustomer = customer || useCustomerStore.getState().customer;
        const url = getWhatsAppOrderUrl(items, targetCustomer);
        window.open(url, '_blank', 'noopener,noreferrer');
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
