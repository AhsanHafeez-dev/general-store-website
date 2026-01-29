"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: { name: string };
  categoryId: number; // Add categoryId to the Product interface
}

interface Category {
  id: number;
  name: string;
}

interface UserSession {
  id: number;
  email: string;
  name?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserSession | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for user in local storage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    async function fetchData() {
      try {
        // Fetch products
        const productsRes = await fetch('/api/products');
        if (!productsRes.ok) {
          throw new Error(`Error fetching products: ${productsRes.statusText}`);
        }
        const productsData: Product[] = await productsRes.json();
        setProducts(productsData);

        // Fetch categories
        const categoriesRes = await fetch('/api/categories');
        if (!categoriesRes.ok) {
          throw new Error(`Error fetching categories: ${categoriesRes.statusText}`);
        }
        const categoriesData: Category[] = await categoriesRes.json();
        setCategories(categoriesData);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAddToCart = async (productId: number) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1, userId: user.id }),
      });

      if (!res.ok) {
        throw new Error(`Error adding item to cart: ${res.statusText}`);
      }

      alert('Item added to cart!');
    } catch (err: any) {
      console.error(err);
      alert('Failed to add item to cart.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.categoryId === selectedCategory)
    : products;

  if (loading) return <div className="container mx-auto p-4 text-center">Loading...</div>;
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
        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Sidebar */}
          <aside className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Categories</h2>
            <ul>
              <li
                className={`cursor-pointer py-2 px-3 rounded-md mb-2 ${selectedCategory === null ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'}`}
                onClick={() => setSelectedCategory(null)}
              >
                All Products
              </li>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`cursor-pointer py-2 px-3 rounded-md mb-2 ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </aside>

          {/* Product Listing */}
          <section className="w-full md:w-3/4">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer">
                  <div className="relative w-full h-48">
                    <Image src={product.imageUrl || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23e0e0e0" width="400" height="300"/><text x="50%" y="50%" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="%23757575" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>'} alt={product.name} fill />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.category.name}</p>
                    <p className="text-gray-700 mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent navigating to product details page
                          handleAddToCart(product.id);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
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
