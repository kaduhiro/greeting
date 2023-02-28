import { DefaultLayout } from '@/components/layouts';
import { Footer, Header } from '@/components/parts';

export default function Home() {
  return (
    <DefaultLayout title={`Greeting`}>
      <section className='relative mx-auto text-gray-600 md:w-2/3 lg:w-1/2'>
        <div className='container mx-auto px-5 py-10 sm:py-24'>
          <Header />
          <Footer />
        </div>
      </section>
    </DefaultLayout>
  );
}
