import teeBlackFront from '@/assets/createmore.png';
import teeBlackBack from '@/assets/comingsoon.png';
import teeWhiteFront from '@/assets/tee-white-front.png';
import teeWhiteBack from '@/assets/tee-white-back.png';
import hoodieFront from '@/assets/front-hoodie.png';
import hoodieBack from '@/assets/back-hoodie.png';
import crewFront from '@/assets/crewneck-front.png';
import crewBack from '@/assets/crewneck-back.png';

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
}

// Add a new product by adding a new entry to this array.
export const productData: Product[] = [
  { id: 'product-x', title: 'Product x', price: 1000, description: 'COMING SOON', images: [teeBlackFront, teeBlackBack], isNew: true },
  
];

export const getProduct = (id?: string) => productData.find(p => p.id === id);
