import { useState } from 'react';
import { useCustomerStore } from '@/stores/customerStore';
import { useCartStore } from '@/stores/cartStore';
import { formatNPR } from '@/lib/currency';
import { MessageSquare, Check, ShieldCheck, MapPin } from 'lucide-react';

interface CustomerOrderFormProps {
  onSuccess?: () => void;
  className?: string;
  isCompact?: boolean;
}

const CITIES = [
  'Kathmandu',
  'Lalitpur',
  'Bhaktapur',
  'Pokhara',
  'Outside Valley (Courier)',
];

export default function CustomerOrderForm({ onSuccess, className = '', isCompact = false }: CustomerOrderFormProps) {
  const { customer, updateCustomer } = useCustomerStore();
  const { items, getTotalPrice, placeOrderRequest } = useCartStore();
  const [showErrors, setShowErrors] = useState(false);

  const total = formatNPR(getTotalPrice());
  const isNameValid = customer.fullName.trim().length > 0;
  const isPhoneValid = customer.phone.trim().length >= 7;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNameValid || !isPhoneValid) {
      setShowErrors(true);
      return;
    }
    placeOrderRequest(customer);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="border border-border/80 bg-background/50 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[11px] uppercase tracking-wider font-medium text-foreground">
              Customer & Delivery Details
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Kathmandu, Nepal
          </span>
        </div>

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-[10px] uppercase tracking-widest text-muted-foreground">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            required
            value={customer.fullName}
            onChange={(e) => updateCustomer({ fullName: e.target.value })}
            placeholder="e.g. Sabin Shrestha"
            className={`w-full bg-secondary/50 border ${
              showErrors && !isNameValid ? 'border-destructive' : 'border-border'
            } px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors`}
          />
          {showErrors && !isNameValid && (
            <p className="text-[10px] text-destructive">Please enter your full name.</p>
          )}
        </div>

        {/* WhatsApp / Phone */}
        <div className="space-y-1.5">
          <label className="block text-[10px] uppercase tracking-widest text-muted-foreground">
            Phone / WhatsApp Number <span className="text-destructive">*</span>
          </label>
          <input
            type="tel"
            required
            value={customer.phone}
            onChange={(e) => updateCustomer({ phone: e.target.value })}
            placeholder="e.g. 98XXXXXXXX"
            className={`w-full bg-secondary/50 border ${
              showErrors && !isPhoneValid ? 'border-destructive' : 'border-border'
            } px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors`}
          />
          {showErrors && !isPhoneValid && (
            <p className="text-[10px] text-destructive">Please enter a valid phone number for WhatsApp confirmation.</p>
          )}
        </div>

        {/* City / Location */}
        <div className="space-y-1.5">
          <label className="block text-[10px] uppercase tracking-widest text-muted-foreground">
            City / Region
          </label>
          <select
            value={customer.city}
            onChange={(e) => updateCustomer({ city: e.target.value })}
            className="w-full bg-secondary/50 border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:border-foreground transition-colors"
          >
            {CITIES.map((c) => (
              <option key={c} value={c} className="bg-background text-foreground">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Delivery Address */}
        <div className="space-y-1.5">
          <label className="block text-[10px] uppercase tracking-widest text-muted-foreground">
            Delivery Street Address / Landmark
          </label>
          <input
            type="text"
            value={customer.deliveryAddress}
            onChange={(e) => updateCustomer({ deliveryAddress: e.target.value })}
            placeholder="e.g. Jhamsikhel, near St. Mary's / Ward 3"
            className="w-full bg-secondary/50 border border-border px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
          />
        </div>

        {/* Special Notes (Hidden in compact view unless filled) */}
        {(!isCompact || customer.notes) && (
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase tracking-widest text-muted-foreground">
              Order Notes / Sizing Inquiries <span className="text-[9px] lowercase opacity-60">(optional)</span>
            </label>
            <textarea
              rows={2}
              value={customer.notes}
              onChange={(e) => updateCustomer({ notes: e.target.value })}
              placeholder="Any specific requests, studio packaging notes, or inquiries..."
              className="w-full bg-secondary/50 border border-border px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground resize-none transition-colors"
            />
          </div>
        )}
      </div>

      {/* Order Dispatch CTA */}
      <div className="space-y-3 pt-1">
        <button
          type="submit"
          disabled={items.length === 0}
          className="w-full h-12 bg-foreground text-background text-xs uppercase tracking-widest font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-opacity"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Place Order on WhatsApp ({total})</span>
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground text-center">
          <ShieldCheck className="w-3 h-3 text-muted-foreground" />
          <span>Direct studio communication. No online payment gateway needed.</span>
        </div>
      </div>
    </form>
  );
}

