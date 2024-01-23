import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Krub, Lalezar, Maitree } from 'next/font/google';

export const krub = Krub({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-krub',
});
export const lalezar = Lalezar({
  weight: '400',
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lalezar',

});
export const maitree = Maitree({
  weight: '400',
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-maitree',
});