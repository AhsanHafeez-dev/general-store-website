import Link from 'next/link';

export default function CancelPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Canceled</h1>
                <p className="text-lg text-gray-700 mb-6">Your payment was not processed. You can try again or continue shopping.</p>
                <div className="flex justify-center space-x-4">
                    <Link href="/cart" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300">
                        Return to Cart
                    </Link>
                    <Link href="/" className="bg-gray-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition duration-300">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
