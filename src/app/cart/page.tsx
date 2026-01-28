"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react";
import { loadStripe } from '@stripe/stripe-js';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    name: string;
    price: number;
    imageUrl: string;
  };
}

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CartPage() {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = async () => {
    if (!session?.user) return;
    try {
      const res = await fetch('/api/cart');
      if (!res.ok) {
        throw new Error(`Error fetching cart items: ${res.statusText}`);
      }
      const data: CartItem[] = await res.json();
      setCartItems(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [session]);

  const handleRemoveFromCart = async (cartItemId: number) => {
    if (!session?.user) return;

    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Error removing item from cart: ${res.statusText}`);
      }

      alert('Item removed from cart!');
      fetchCartItems(); // Re-fetch cart items to update the UI
    } catch (err: any) {
      console.error(err);
      alert('Failed to remove item from cart.');
    }
  };

  const handleCheckout = async () => {
    if (!session?.user) {
      alert("Please sign in to proceed to checkout.");
      signIn();
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe.js failed to load.");
      }

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create checkout session.');
      }

      const { url } = await res.json();
      window.location.href = url; // Redirect to Stripe Checkout

    } catch (err: any) {
      console.error(err);
      alert(`Checkout failed: ${err.message}`);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  if (loading) return <div className="container mx-auto p-4 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>;
  if (!session?.user) return <div className="container mx-auto p-4 text-center">Please sign in to view your cart.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-gray-800">General Store</h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
              <li><Link href="/cart" className="text-gray-600 hover:text-gray-900">Cart</Link></li>
              {session ? (
                <>
                  <li className="text-gray-600">Welcome, {session.user?.name || session.user?.email}!</li>
                  <li>
                    <button onClick={() => signOut()} className="text-red-600 hover:text-red-800">
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li><button onClick={() => signIn()} className="text-green-600 hover:text-green-800">Sign In</button></li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
            <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
                  <div className="relative w-24 h-24 mr-4 flex-shrink-0">
                    <Image
                      src={item.product.imageUrl || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23e0e0e0" width="400" height="300"/><text x="50%" y="50%" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="%23757575" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>'}
                      alt={item.product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800">{item.product.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-900 font-bold">${(item.quantity * item.product.price).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg text-gray-700">Total:</p>
                <p className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2026 General Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
