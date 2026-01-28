"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client'; // This will cause an error on client side, needs to be handled via API route

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    name: string;
    price: number;
  };
}

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { data: session, status } = useSession();
  const [message, setMessage] = useState('Processing your order...');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function handleSuccess() {
      if (!sessionId || status !== 'authenticated') return;

      try {
        const res = await fetch('/api/confirm-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, userId: session.user.id }),
        });

        const data = await res.json();

        if (res.ok) {
          setMessage(data.message || 'Payment successful! Your order has been placed.');
        } else {
          setIsError(true);
          setMessage(data.error || 'Failed to confirm your order. Please contact support.');
        }
      } catch (err: any) {
        setIsError(true);
        setMessage(`An error occurred: ${err.message}`);
      }
    }

    if (status === 'authenticated') {
      handleSuccess();
    }
  }, [sessionId, session, status]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {isError ? (
          <h2 className="text-3xl font-bold text-red-600 mb-4">Order Failed</h2>
        ) : (
          <h2 className="text-3xl font-bold text-green-600 mb-4">Order Success!</h2>
        )}
        <p className="text-gray-700 text-lg mb-6">{message}</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
