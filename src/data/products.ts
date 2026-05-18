export type Product = {
  id: string;
  size: string;
  weight: string;
  usCase: string;
  blurb: string;
  image: string;
  imageAlt: string;
};

import bucket4kg from '@/assets/products/4kg-bucket.webp';
import tub700g from '@/assets/products/700g-tub.webp';
import bag1kg from '@/assets/products/1kg-bag.webp';
import box25kg from '@/assets/products/25kg-box.webp';

export const products: Product[] = [
  {
    id: '700g',
    size: '700g Tub',
    weight: '700g · 25oz',
    usCase: 'Personal',
    blurb: 'Daily use — palm-sized tub for the bathroom shelf.',
    image: tub700g,
    imageAlt: 'Ralawi Sheas 700 gram tub of unrefined shea butter on wood surface',
  },
  {
    id: '1kg',
    size: '1kg Pack',
    weight: '1kg',
    usCase: 'Refill',
    blurb: 'Vacuum-sealed brick. Decant into your own jar.',
    image: bag1kg,
    imageAlt: 'Ralawi Sheas 1 kilogram vacuum-sealed pack of unrefined shea butter',
  },
  {
    id: '4kg',
    size: '4kg Bucket',
    weight: '4kg · 8.8lbs',
    usCase: 'Household',
    blurb: 'For families and people who go through it weekly.',
    image: bucket4kg,
    imageAlt: 'Ralawi Sheas 4 kilogram blue bucket of unrefined shea butter',
  },
  {
    id: '25kg',
    size: '25kg Box',
    weight: '25kg · 55lbs',
    usCase: 'Wholesale',
    blurb: 'For formulators, salons, and small batch makers.',
    image: box25kg,
    imageAlt: 'Ralawi Sheas 25 kilogram cardboard box of bulk unrefined shea butter',
  },
];
