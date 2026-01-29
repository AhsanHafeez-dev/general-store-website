"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { FALLBACK_PRODUCTS, Product } from '@/lib/fallbackData';

interface UserSession {
  id: number;
  email: string;
  name?: string;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    // Check for user in local storage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    async function fetchProduct() {
      if (!id) return;
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data: Product = await res.json();
        setProduct(data);
      } catch (err: any) {
        console.warn('Using fallback product data');

        // Find product in fallback list
        const fallbackProduct = FALLBACK_PRODUCTS.find(p => p.id === Number(id));

        if (fallbackProduct) {
          setProduct(fallbackProduct);
          setError(null);
        } else {
          // Generic fallback if not found in list (or id is not a number)
          setProduct({
            id: 0,
            name: 'Fallback Product',
            description: 'This is a fallback product because the server is unreachable.',
            price: 0.00,
            imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            category: { name: 'Uncategorized' },
            categoryId: 0
          });
          setError(null);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      router.push('/login');
      return;
    }

    if (!product) return;

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1, userId: user.id }),
      });

      if (!res.ok) {
        throw new Error('Failed to add to cart via API');
      }

      alert('Item added to cart!');
    } catch (err: any) {
      console.warn('Add to cart API failed, using fallback:', err);
      // Fallback: Add to local storage cart
      const storedCart = localStorage.getItem('cart');
      let cart = storedCart ? JSON.parse(storedCart) : [];

      const existingItemIndex = cart.findIndex((item: any) => item.productId === product.id && item.userId === user.id);

      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({
          id: Date.now(),
          productId: product.id,
          quantity: 1,
          userId: user.id
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Offline Mode: Item added to cart locally!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  if (loading) return <div className="container mx-auto p-4 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>;
  if (!product) return <div className="container mx-auto p-4 text-center">Product not found</div>;

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
              <li><Link href="/orders" className="text-gray-600 hover:text-gray-900">Orders</Link></li>
              {user ? (
                <>
                  <li className="text-gray-600">Welcome, {user.name || user.email}!</li>
                  <li>
                    <button onClick={handleLogout} className="text-red-600 hover:text-red-800">
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li><Link href="/login" className="text-green-600 hover:text-green-800">Sign In</Link></li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 md:flex md:items-center">
          <div className="md:w-1/2 relative h-96 mb-6 md:mb-0">
            <Image
              src={product.imageUrl || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23e0e0e0" width="400" height="300"/><text x="50%" y="50%" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="%23757575" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>'}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-black text-lg mb-4">{product.category.name}</p>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">{product.description}</p>
            <div className="flex items-center justify-between mb-6">
              <span className="text-4xl font-bold text-black">${product.price.toFixed(2)}</span>
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
            <Link href="/" className="text-blue-600 hover:underline">
              &larr; Back to Products
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2026 General Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
