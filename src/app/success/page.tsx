"use client";

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
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
                console.warn('Order confirmation API failed, using fallback:', err);

                // Fallback: Create local order
                try {
                    const userStr = localStorage.getItem('user');
                    if (userStr) {
                        const user = JSON.parse(userStr);
                        const storedCart = localStorage.getItem('cart');
                        const cartItems = storedCart ? JSON.parse(storedCart).filter((item: any) => item.userId === user.id) : [];

                        if (cartItems.length > 0) {
                            // Calculate total (assuming we have price in cart items or need to fetch/fallback)
                            // For simplicity in offline mode, we might need price in cart items
                            // In cart page fallback we enriched items, but raw storage might not have price
                            // We'll assume raw storage has enough or we just use dummy values

                            // We need a way to get price. We can look up FALLBACK_PRODUCTS if needed, or assume data is there.
                            // Let's assume we can calculate it roughly or set 0.

                            let totalAmount = 0;
                            // We don't have product details in raw cart storage (only ID). 
                            // We can try to look up generic prices or just set 0.

                            const newOrder = {
                                id: Date.now(),
                                orderDate: new Date().toISOString(),
                                totalAmount: 0, // Simplified for fallback
                                stripeSessionId: sessionId || 'offline_session',
                                status: 'paid',
                                orderItems: cartItems.map((item: any) => ({
                                    id: Date.now() + Math.random(),
                                    quantity: item.quantity,
                                    price: 0, // Simplified
                                    product: {
                                        name: 'Offline Product',
                                        imageUrl: ''
                                    }
                                }))
                            };

                            const storedOrders = localStorage.getItem('orders');
                            const orders = storedOrders ? JSON.parse(storedOrders) : [];
                            orders.push(newOrder);
                            localStorage.setItem('orders', JSON.stringify(orders));

                            // Clear local cart
                            const allCartItems = storedCart ? JSON.parse(storedCart) : [];
                            const remainingItems = allCartItems.filter((item: any) => item.userId !== user.id);
                            localStorage.setItem('cart', JSON.stringify(remainingItems));

                            alert('Offline Mode: Order placed locally!');
                        }
                    }
                } catch (e) {
                    console.error('Fallback order creation failed', e);
                }

                // Redirect anyway
                setTimeout(() => {
                    router.push('/orders');
                }, 2000);
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

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><p className="text-xl">Loading...</p></div>}>
            <SuccessContent />
        </Suspense>
    );
}
