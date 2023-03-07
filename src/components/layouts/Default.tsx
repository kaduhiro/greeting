import { useEffect } from 'react';

import Head from 'next/head';
import { useRecoilValue } from 'recoil';

import { timeState } from '@/states';
import { LayoutProps } from '@/types';

import styles from '@/assets/css/layouts/DefaultLayout.module.css';

export const DefaultLayout = ({ children, title }: LayoutProps) => {
  const time = useRecoilValue(timeState);

  useEffect(() => {
    document.body.className = time.morning ? 'light' : 'dark';
  });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='description' content='Greeting' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='icon'
          href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>👋</text></svg>'
        ></link>
      </Head>
      <main className={`${styles.main} bg-white dark:bg-neutral-900`}>{children}</main>
    </>
  );
};
