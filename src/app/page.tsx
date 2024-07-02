import { Button } from '@/components';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-(calc(100vh - 80px) flex-col items-center space-y-12 p-24'>
      <h2>Build your amazing Resume</h2>
      <Link href={'/build'}>
        <Button>Build</Button>
      </Link>
    </main>
  );
}
