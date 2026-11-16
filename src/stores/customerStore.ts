import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CustomerOrderDetails } from '@/lib/whatsapp';

interface CustomerStoreState {
  customer: CustomerOrderDetails;
  updateCustomer: (fields: Partial<CustomerOrderDetails>) => void;
  resetCustomer: () => void;
  hasMinimumDetails: () => boolean;
}

const defaultCustomer: CustomerOrderDetails = {
  fullName: '',
  phone: '',
  deliveryAddress: '',
  city: 'Kathmandu',
  notes: '',
};

export const useCustomerStore = create<CustomerStoreState>()(
  persist(
    (set, get) => ({
      customer: defaultCustomer,
      updateCustomer: (fields) =>
        set((state) => ({
          customer: { ...state.customer, ...fields },
        })),
      resetCustomer: () => set({ customer: defaultCustomer }),
      hasMinimumDetails: () => {
        const { fullName, phone } = get().customer;
        return fullName.trim().length > 0 && phone.trim().length > 0;
      },
    }),
    {
      name: 'coredeltav-checkout-customer',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
