import teeBlackFront from '@/assets/createmore.png';
import teeBlackBack from '@/assets/comingsoon.png';

export interface Product {
  /** Used in the URL: /shop/:id */
  id: string;
  title: string;
  /** Price in Nepali Rupees */
  price: number;
  description: string;
  images: string[];
  isNew?: boolean;
  soldOut?: boolean;
  category?: string;
  edition?: string;
  details?: string[];
}

// Add a new product by adding a new entry to this array.
export const productData: Product[] = [
  {
    id: 'product-x',
    title: 'Product x',
    price: 1000,
    description: 'Designed and crafted in Kathmandu, Nepal. Custom studio silhouette exploring minimal brutalist form, premium heavyweight tactile texture, and enduring studio craft.',
    images: [teeBlackFront, teeBlackBack],
    isNew: true,
    category: 'Studio Objects & Apparel',
    edition: 'Edition 01 / Kathmandu',
    details: [
      'Crafted with premium tactile heavyweight cotton',
      'Minimalist tailored silhouette with subtle drop shoulder',
      'Designed, sampled, and finished in Kathmandu, Nepal',
      'Packaging includes custom coredeltav™ archival sleeve',
    ],
  },
];

export const getProduct = (id?: string) => productData.find(p => p.id === id);
