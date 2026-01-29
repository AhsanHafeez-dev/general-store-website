export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: { name: string };
    categoryId: number;
}

export const FALLBACK_CATEGORIES: Category[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' },
    { id: 4, name: 'Home & Kitchen' },
    { id: 5, name: 'Sports & Outdoors' },
];

export const FALLBACK_PRODUCTS: Product[] = [
    // Electronics
    { id: 1, name: 'Laptop Pro', description: 'High performance laptop for professionals', price: 1299.99, imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Electronics' }, categoryId: 1 },
    { id: 4, name: 'Smartphone X', description: 'Latest model with stunning display', price: 999.99, imageUrl: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Electronics' }, categoryId: 1 },
    { id: 5, name: 'Wireless Headphones', description: 'Noise cancelling over-ear headphones', price: 199.99, imageUrl: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Electronics' }, categoryId: 1 },
    { id: 6, name: 'Smart Watch', description: 'Track your fitness and stay connected', price: 149.99, imageUrl: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Electronics' }, categoryId: 1 },
    { id: 7, name: '4K Monitor', description: '27-inch ultra HD monitor', price: 349.99, imageUrl: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Electronics' }, categoryId: 1 },
    { id: 8, name: 'Bluetooth Speaker', description: 'Portable speaker with powerful bass', price: 59.99, imageUrl: 'https://images.pexels.com/photos/2651701/pexels-photo-2651701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Electronics' }, categoryId: 1 },

    // Books
    { id: 3, name: 'Classic Novel', description: 'A timeless classic', price: 14.99, imageUrl: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Books' }, categoryId: 2 },
    { id: 9, name: 'Sci-Fi Adventure', description: 'Journey to the stars', price: 12.99, imageUrl: 'https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Books' }, categoryId: 2 },
    { id: 10, name: 'Cookbook Master', description: 'Learn to cook like a pro', price: 24.99, imageUrl: 'https://images.pexels.com/photos/1109312/pexels-photo-1109312.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Books' }, categoryId: 2 },
    { id: 11, name: 'History of Time', description: 'A brief history of everything', price: 18.99, imageUrl: 'https://images.pexels.com/photos/159869/books-book-pages-read-literature-159869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Books' }, categoryId: 2 },
    { id: 12, name: 'Modern Art', description: 'Coffee table book about art', price: 45.99, imageUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Books' }, categoryId: 2 },
    { id: 13, name: 'Biography', description: 'Life of a famous person', price: 16.99, imageUrl: 'https://images.pexels.com/photos/904620/pexels-photo-904620.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Books' }, categoryId: 2 },

    // Clothing
    { id: 2, name: 'Canvas Sneakers', description: 'Comfortable everyday sneakers', price: 49.99, imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Clothing' }, categoryId: 3 },
    { id: 14, name: 'Denim Jacket', description: 'Stylish classic denim jacket', price: 79.99, imageUrl: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Clothing' }, categoryId: 3 },
    { id: 15, name: 'Summer Dress', description: 'Lightweight floral dress', price: 39.99, imageUrl: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Clothing' }, categoryId: 3 },
    { id: 16, name: 'Running Shorts', description: 'Breathable shorts for running', price: 29.99, imageUrl: 'https://images.pexels.com/photos/601177/pexels-photo-601177.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Clothing' }, categoryId: 3 },
    { id: 17, name: 'Winter Coat', description: 'Warm wool coat for winter', price: 129.99, imageUrl: 'https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Clothing' }, categoryId: 3 },
    { id: 18, name: 'Leather Belt', description: 'Genuine leather belt', price: 35.99, imageUrl: 'https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Clothing' }, categoryId: 3 },

    // Home & Kitchen
    { id: 19, name: 'Ceramic Vase', description: 'Handcrafted ceramic vase', price: 25.00, imageUrl: 'https://images.pexels.com/photos/1039626/pexels-photo-1039626.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Home & Kitchen' }, categoryId: 4 },
    { id: 20, name: 'Coffee Maker', description: 'Programmable coffee machine', price: 65.00, imageUrl: 'https://images.pexels.com/photos/2067628/pexels-photo-2067628.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Home & Kitchen' }, categoryId: 4 },
    { id: 21, name: 'Wall Clock', description: 'Minimalist modern wall clock', price: 40.00, imageUrl: 'https://images.pexels.com/photos/210557/pexels-photo-210557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Home & Kitchen' }, categoryId: 4 },
    { id: 22, name: 'Throw Pillow', description: 'Soft velvet throw pillow', price: 15.99, imageUrl: 'https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Home & Kitchen' }, categoryId: 4 },

    // Sports & Outdoors
    { id: 23, name: 'Yoga Mat', description: 'Non-slip exercise yoga mat', price: 22.00, imageUrl: 'https://images.pexels.com/photos/4056529/pexels-photo-4056529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Sports & Outdoors' }, categoryId: 5 },
    { id: 24, name: 'Dumbbells Set', description: 'Set of 2 weights', price: 55.00, imageUrl: 'https://images.pexels.com/photos/38630/bodybuilding-weight-training-stress-38630.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Sports & Outdoors' }, categoryId: 5 },
    { id: 25, name: 'Camping Tent', description: '2-person waterproof tent', price: 89.99, imageUrl: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Sports & Outdoors' }, categoryId: 5 },
    { id: 26, name: 'Hiking Backpack', description: 'Durable backpack for hiking', price: 65.99, imageUrl: 'https://images.pexels.com/photos/1367060/pexels-photo-1367060.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Sports & Outdoors' }, categoryId: 5 },

    // More Electronics
    { id: 27, name: 'Gaming Mouse', description: 'RGB gaming mouse', price: 45.00, imageUrl: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Electronics' }, categoryId: 1 },
    { id: 28, name: 'Mechanical Keyboard', description: 'Clicky mechanical keyboard', price: 85.00, imageUrl: 'https://images.pexels.com/photos/472605/pexels-photo-472605.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Electronics' }, categoryId: 1 },

    // More Books
    { id: 29, name: 'Mystery Thriller', description: 'Edge of your seat thriller', price: 13.50, imageUrl: 'https://images.pexels.com/photos/2228581/pexels-photo-2228581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Books' }, categoryId: 2 },

    // More Clothing
    { id: 30, name: 'Sunglasses', description: 'UV protection sunglasses', price: 19.99, imageUrl: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Clothing' }, categoryId: 3 },
    { id: 31, name: 'Baseball Cap', description: 'Cotton baseball cap', price: 12.00, imageUrl: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', category: { name: 'Clothing' }, categoryId: 3 },
];
