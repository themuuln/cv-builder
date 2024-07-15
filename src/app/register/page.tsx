'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/initSupabase';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      alert('Check your email for the confirmation link!');
      router.push('/login');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='flex justify-center py-24 '>
      <div className='w-full max-w-md'>
        <form
          onSubmit={handleSubmit}
          className='shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <h2 className='text-2xl mb-6 text-center font-bold'>Register</h2>
          {error && <p className='text-red-500 text-xs italic mb-4'>{error}</p>}
          <div className='mb-4'>
            <Label htmlFor='email'>Email</Label>
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
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              placeholder='******************'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='flex items-center justify-between'>
            <Button type='submit'>Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
