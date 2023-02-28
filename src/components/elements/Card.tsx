import { Inter } from '@next/font/google';

import styles from '@/assets/css/components/Card.module.css';

const inter = Inter({ subsets: ['latin'] });

export type CardProps = {
  url: string;
  title: string;
  description: string;
};

export const Card = ({ url, title, description }: CardProps) => {
  return (
    <>
      <a href={url} className={styles.card} target='_blank' rel='noopener noreferrer'>
        <h2 className={inter.className}>
          {title} <span>-&gt;</span>
        </h2>
        <p className={inter.className}>{description}</p>
      </a>
    </>
  );
};
