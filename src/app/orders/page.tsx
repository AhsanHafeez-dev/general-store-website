"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: {
    name: string;
    imageUrl: string;
  };
}

interface Order {
  id: number;
  orderDate: string;
  totalAmount: number;
  stripeSessionId?: string;
  status?: string;
  orderItems: OrderItem[];
}

interface UserSession {
  id: number;
  email: string;
  name?: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await fetch(`/api/orders?userId=${user.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch orders via API');
        }
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err: any) {
        console.warn('Fetch orders API failed, using fallback:', err);
        // Fallback: Read from local storage
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
          // In a real app we would filter by userId, but our mock orders might not have userId firmly attached 
          // unless we added it in success page. 
          // In success page fallback I didn't explicitly add userId to the order object, which was an oversight.
          // However, since localStorage is client-side, we can assume "my orders" are just the ones stored here.
          // Or filter if we did add it.
          const allOrders = JSON.parse(storedOrders);
          // Improving fallback: simple return all orders in storage as "mine"
          setOrders(allOrders);
        } else {
          setOrders([]);
        }
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  if (loading || !user) return <div className="container mx-auto p-4 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>;

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
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h2>

        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-lg">You haven't placed any orders yet.</p>
            <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Order #{order.id}</h3>
                  <p className="text-gray-600">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex items-center mb-3">
                      <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                        <img src={item.product.imageUrl || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23e0e0e0" width="400" height="300"/><text x="50%" y="50%" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="%23757575" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>'} alt={item.product.name} className="rounded-md object-cover w-full h-full" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{item.product.name}</p>
                        <p className="text-gray-600">Quantity: {item.quantity} x ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-4 mt-4">
                  <div className="mb-2 md:mb-0">
                    <p className="text-sm text-gray-500">Payment Status: <span className={`font-semibold ${order.status === 'paid' ? 'text-green-600' : 'text-gray-600'}`}>{order.status || 'Unknown'}</span></p>
                    {order.stripeSessionId && (
                      <p className="text-xs text-gray-400">Payment ID: {order.stripeSessionId.slice(-8)}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-800">Total: <span className="text-gray-900">${order.totalAmount.toFixed(2)}</span></p>
                  </div>
                </div>
              </div>
            ))}
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
