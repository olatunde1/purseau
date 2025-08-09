import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function EmptyWishlist() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto text-center py-20 px-6">
      <h1 className="text-3xl font-semibold mb-2">My Wishlist (0)</h1>
      <Heart size={48} className="mx-auto text-gray-400 mb-4" />
      <p className="text-lg font-medium mb-2">You haven’t saved any item yet!</p>
      <p className="text-gray-600 mb-6">
        Spotted something you love? Just tap the heart icon beside it to save it to your wishlist!
        All your favorites will be saved for you right here.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-[#F2542D] text-white px-6 py-2 rounded hover:bg-[#d84325] transition"
      >
        Continue Shopping
      </button>
    </div>
  );
}
