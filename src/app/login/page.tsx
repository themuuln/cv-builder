'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/initSupabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Initialize the Supabase client

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      router.push('/build');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center py-24'>
      <div className='w-full max-w-md'>
        <form
          onSubmit={handleSubmit}
          className='shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <h2 className='text-2xl mb-6 text-center font-bold'>Login</h2>
          {error && <p className='text-red-500 text-xs italic mb-4'>{error}</p>}
          <div className='mb-4'>
            <label className='block text-sm font-bold mb-2' htmlFor='email'>
              Email
            </label>
            <Input
              id='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-sm font-bold mb-2' htmlFor='password'>
              Password
            </label>
            <Input
              id='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='flex items-center justify-between'>
            <Button type='submit'>Sign In</Button>
            <Link href={'/register'}>
              <Button variant={'link'}>Need an account?</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
