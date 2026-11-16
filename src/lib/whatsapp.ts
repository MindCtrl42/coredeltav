import { formatNPR, WHATSAPP_NUMBER } from './currency';
import { Product } from '@/data/productData';

export interface CustomerOrderDetails {
  fullName: string;
  phone: string;
  deliveryAddress: string;
  city: string;
  notes?: string;
}

export interface CartItemLike {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

/**
 * Generates a concise studio order reference code like #CDV-4821
 */
export function generateOrderRef(): string {
  const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let ref = '';
  for (let i = 0; i < 4; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return `CDV-${ref}`;
}

/**
 * Formats a clean, high-editorial pre-filled WhatsApp message for an order request.
 */
export function formatWhatsAppOrderMessage(
  items: CartItemLike[],
  customer?: Partial<CustomerOrderDetails>,
  orderRef?: string
): string {
  const ref = orderRef || generateOrderRef();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const lines: string[] = [
    '✦ *COREDELTAV™ STUDIO ORDER REQUEST* ✦',
    `*Ref:* #${ref}`,
    `*Date:* ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`,
    '',
    '━━━━━━━━━━━━━━━━━━━━',
    '👤 *CUSTOMER DETAILS*',
    `• *Name:* ${customer?.fullName?.trim() || 'Direct Inquiry'}`,
    `• *Phone:* ${customer?.phone?.trim() || 'Not specified'}`,
    `• *Delivery Address:* ${customer?.deliveryAddress?.trim() || 'To be confirmed on chat'}`,
    `• *City / Region:* ${customer?.city?.trim() || 'Kathmandu Valley, Nepal'}`,
  ];

  if (customer?.notes?.trim()) {
    lines.push(`• *Notes:* ${customer.notes.trim()}`);
  }

  lines.push(
    '',
    '━━━━━━━━━━━━━━━━━━━━',
    '📦 *ITEMS ORDERED*',
    ...items.map((item, index) => {
      const itemTotal = formatNPR(item.price * item.quantity);
      return `${index + 1}. *${item.title.toUpperCase()}*\n   Qty: ${item.quantity} × ${formatNPR(item.price)} = ${itemTotal}`;
    }),
    '',
    '━━━━━━━━━━━━━━━━━━━━',
    `*ESTIMATED SUBTOTAL:* ${formatNPR(subtotal)}`,
    '_Shipping to be calculated based on delivery location within Nepal._',
    '',
    '━━━━━━━━━━━━━━━━━━━━',
    'Please confirm availability and delivery timeframe. Thank you!'
  );

  return lines.join('\n');
}

/**
 * Returns the fully encoded WhatsApp URL to dispatch the order.
 */
export function getWhatsAppOrderUrl(
  items: CartItemLike[],
  customer?: Partial<CustomerOrderDetails>,
  orderRef?: string
): string {
  const message = formatWhatsAppOrderMessage(items, customer, orderRef);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns a direct product inquiry WhatsApp URL for single-item queries.
 */
export function getWhatsAppProductInquiryUrl(product: Product): string {
  const message = [
    '✦ *COREDELTAV™ PRODUCT INQUIRY* ✦',
    '',
    `Hello Sabin, I am interested in: *${product.title.toUpperCase()}*`,
    `Price: ${formatNPR(product.price)}`,
    product.edition ? `Edition: ${product.edition}` : '',
    '',
    'Could you please share details on availability, sizing, and studio delivery in Kathmandu?',
    '',
    'Thank you!'
  ].filter(Boolean).join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

