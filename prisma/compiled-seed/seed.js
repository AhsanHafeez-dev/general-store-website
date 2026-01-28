"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var electronics, books, clothes, homeAppliances, groceries, productsData, _i, productsData_1, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Clear existing data
                return [4 /*yield*/, prisma.orderItem.deleteMany()];
                case 1:
                    // Clear existing data
                    _a.sent();
                    return [4 /*yield*/, prisma.order.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.cartItem.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.product.deleteMany()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.category.deleteMany()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, prisma.category.create({ data: { name: 'Electronics' } })];
                case 7:
                    electronics = _a.sent();
                    return [4 /*yield*/, prisma.category.create({ data: { name: 'Books' } })];
                case 8:
                    books = _a.sent();
                    return [4 /*yield*/, prisma.category.create({ data: { name: 'Clothes' } })];
                case 9:
                    clothes = _a.sent();
                    return [4 /*yield*/, prisma.category.create({ data: { name: 'Home Appliances' } })];
                case 10:
                    homeAppliances = _a.sent();
                    return [4 /*yield*/, prisma.category.create({ data: { name: 'Groceries' } })];
                case 11:
                    groceries = _a.sent();
                    productsData = [
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
                    _i = 0, productsData_1 = productsData;
                    _a.label = 12;
                case 12:
                    if (!(_i < productsData_1.length)) return [3 /*break*/, 15];
                    product = productsData_1[_i];
                    return [4 /*yield*/, prisma.product.create({ data: product })];
                case 13:
                    _a.sent();
                    _a.label = 14;
                case 14:
                    _i++;
                    return [3 /*break*/, 12];
                case 15:
                    console.log('Database seeded successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
