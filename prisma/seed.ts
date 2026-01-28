
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create Categories
  const electronics = await prisma.category.create({ data: { name: 'Electronics' } });
  const books = await prisma.category.create({ data: { name: 'Books' } });
  const clothes = await prisma.category.create({ data: { name: 'Clothes' } });
  const homeAppliances = await prisma.category.create({ data: { name: 'Home Appliances' } });
  const groceries = await prisma.category.create({ data: { name: 'Groceries' } });

  // Create Products
  const productsData = [
    {
      name: 'Laptop Pro',
      description: 'Powerful laptop for professionals.',
      price: 1200.00,
      imageUrl: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: electronics.id,
    },
    {
      name: 'Smartphone X',
      description: 'Latest smartphone with advanced features.',
      price: 800.00,
      imageUrl: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: electronics.id,
    },
    {
      name: 'Mechanical Keyboard',
      description: 'Durable mechanical keyboard for gaming and typing.',
      price: 150.00,
      imageUrl: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: electronics.id,
    },
    {
      name: 'The Great Gatsby',
      description: 'A classic novel by F. Scott Fitzgerald.',
      price: 10.50,
      imageUrl: 'https://images.pexels.com/photos/1034651/pexels-photo-1034651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: books.id,
    },
    {
      name: 'Sapiens: A Brief History of Humankind',
      description: 'A global bestseller by Yuval Noah Harari.',
      price: 15.75,
      imageUrl: 'https://images.pexels.com/photos/1034651/pexels-photo-1034651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: books.id,
    },
    {
      name: 'Men\'s T-Shirt',
      description: 'Comfortable cotton t-shirt for everyday wear.',
      price: 25.00,
      imageUrl: 'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: clothes.id,
    },
    {
      name: 'Women\'s Jeans',
      description: 'Stylish denim jeans for women.',
      price: 55.00,
      imageUrl: 'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: clothes.id,
    },
    {
      name: 'Refrigerator',
      description: 'Energy-efficient refrigerator with large capacity.',
      price: 700.00,
      imageUrl: 'https://images.pexels.com/photos/13593455/pexels-photo-13593455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: homeAppliances.id,
    },
    {
      name: 'Microwave Oven',
      description: 'Compact microwave oven for quick meals.',
      price: 120.00,
      imageUrl: 'https://images.pexels.com/photos/13593455/pexels-photo-13593455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: homeAppliances.id,
    },
    {
      name: 'Organic Milk',
      description: 'Fresh organic milk, 1 liter.',
      price: 3.50,
      imageUrl: 'https://images.pexels.com/photos/248559/pexels-photo-248559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: groceries.id,
    },
    {
      name: 'Whole Wheat Bread',
      description: 'Healthy whole wheat bread.',
      price: 2.75,
      imageUrl: 'https://images.pexels.com/photos/248559/pexels-photo-248559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: groceries.id,
    },
    {
      name: 'Coffee Maker',
      description: 'Automatic coffee maker for your daily brew.',
      price: 80.00,
      imageUrl: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: homeAppliances.id,
    },
    {
      name: 'Blender',
      description: 'High-speed blender for smoothies and shakes.',
      price: 60.00,
      imageUrl: 'https://images.pexels.com/photos/13593455/pexels-photo-13593455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: homeAppliances.id,
    },
    {
      name: 'Desk Lamp',
      description: 'Modern desk lamp with adjustable brightness.',
      price: 30.00,
      imageUrl: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: homeAppliances.id,
    },
    {
      name: 'Headphones',
      description: 'Noise-cancelling headphones with superior sound quality.',
      price: 200.00,
      imageUrl: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: electronics.id,
    },
    {
      name: 'Smartwatch',
      description: 'Fitness tracker and smartwatch with heart rate monitor.',
      price: 180.00,
      imageUrl: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: electronics.id,
    },
    {
      name: 'Fantasy Novel',
      description: 'An epic fantasy adventure.',
      price: 12.00,
      imageUrl: 'https://images.pexels.com/photos/1034651/pexels-photo-1034651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: books.id,
    },
    {
      name: 'Science Fiction Book',
      description: 'Mind-bending science fiction.',
      price: 14.00,
      imageUrl: 'https://images.pexels.com/photos/1034651/pexels-photo-1034651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: books.id,
    },
    {
      name: 'Summer Dress',
      description: 'Light and airy dress for summer.',
      price: 45.00,
      imageUrl: 'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: clothes.id,
    },
    {
      name: 'Winter Coat',
      description: 'Warm winter coat for cold weather.',
      price: 90.00,
      imageUrl: 'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: clothes.id,
    },
    {
      name: 'Washing Machine',
      description: 'Automatic washing machine with multiple programs.',
      price: 600.00,
      imageUrl: 'https://images.pexels.com/photos/13593455/pexels-photo-13593455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: homeAppliances.id,
    },
    {
      name: 'Toaster',
      description: '2-slice toaster with browning control.',
      price: 25.00,
      imageUrl: 'https://images.pexels.com/photos/13593455/pexels-photo-13593455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: homeAppliances.id,
    },
    {
      name: 'Cereal',
      description: 'Healthy breakfast cereal.',
      price: 4.00,
      imageUrl: 'https://images.pexels.com/photos/248559/pexels-photo-248559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: groceries.id,
    },
    {
      name: 'Pasta',
      description: 'Italian pasta, 500g.',
      price: 2.00,
      imageUrl: 'https://images.pexels.com/photos/248559/pexels-photo-248559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: groceries.id,
    },
    {
      name: 'Juice',
      description: 'Fresh orange juice, 1 liter.',
      price: 3.00,
      imageUrl: 'https://images.pexels.com/photos/248559/pexels-photo-248559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: groceries.id,
    },
    {
      name: 'Gaming Console',
      description: 'Next-gen gaming console for immersive gaming.',
      price: 500.00,
      imageUrl: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: electronics.id,
    },
    {
      name: 'Tablet',
      description: 'Portable tablet for work and entertainment.',
      price: 300.00,
      imageUrl: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: electronics.id,
    },
    {
      name: 'Cookbook',
      description: 'A collection of delicious recipes.',
      price: 20.00,
      imageUrl: 'https://images.pexels.com/photos/1034651/pexels-photo-1034651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: books.id,
    },
    {
      name: 'Biography',
      description: 'Inspirational biography of a famous personality.',
      price: 18.00,
      imageUrl: 'https://images.pexels.com/photos/1034651/pexels-photo-1034651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: books.id,
    },
    {
      name: 'Jacket',
      description: 'Stylish jacket for all seasons.',
      price: 70.00,
      imageUrl: 'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      categoryId: clothes.id,
    },
  ];

  for (const product of productsData) {
    await prisma.product.create({ data: product });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
