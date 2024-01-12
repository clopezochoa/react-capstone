import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Krub, Lalezar, Maitree } from 'next/font/google';

const krub = Krub({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-krub',
});
const lalezar = Lalezar({
  weight: '400',
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lalezar',

});
const maitree = Maitree({
  weight: '400',
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-maitree',
});

const fonts = [krub, lalezar, maitree] as Array<NextFontWithVariable>;

export default fonts;