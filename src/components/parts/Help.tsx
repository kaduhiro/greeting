import { Card } from '@/components/elements';

import styles from '@/assets/css/components/Help.module.css';

export const Help = () => {
  return (
    <div className={styles.grid}>
      <Card
        url='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        title='Docs'
        description='Find in-depth information about Next.js features and&nbsp;API.'
      />
      <Card
        url='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        title='Learn'
        description='Learn about Next.js in an interactive course with&nbsp;quizzes!'
      />
      <Card
        url='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        title='Templates'
        description='Discover and deploy boilerplate example Next.js&nbsp;projects.'
      />
      <Card
        url='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        title='Deploy'
        description='Instantly deploy your Next.js site to a shareable URL with&nbsp;Vercel.'
      />
    </div>
  );
};
