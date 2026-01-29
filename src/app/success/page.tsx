"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!sessionId) {
            setLoading(false);
            return;
        }

        const confirmOrder = async () => {
            try {
                const userStr = localStorage.getItem('user');
                if (!userStr) throw new Error('User not found');
                const user = JSON.parse(userStr);

                const res = await fetch('/api/orders/confirm', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId, userId: user.id }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error);

                // Redirect to orders page after a short delay
                setTimeout(() => {
                    router.push('/orders');
                }, 2000);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        confirmOrder();
    }, [sessionId, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-xl">Processing your order...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50">
                <div className="text-center">
                    <h1 className="text-2xl text-red-600 mb-2">Something went wrong</h1>
                    <p className="text-gray-700">{error}</p>
                    <Link href="/cart" className="text-blue-600 underline mt-4 block">Return to Cart</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
                <p className="text-lg text-gray-700 mb-6">Thank you for your purchase. Redirecting to your orders...</p>
                <Link href="/orders" className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition duration-300">
                    View Orders
                </Link>
            </div>
        </div>
    );
}
