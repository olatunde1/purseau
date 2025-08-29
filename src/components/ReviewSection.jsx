import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import UploadImage from '../assets/images/upload-image.png';

const reviews = [
  { id: 1, name: 'Olabunmi', stars: 5, subject: 'Excellent product, I like it', statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', time: '1 week ago' },
  { id: 2, name: 'Olabunmi', stars: 4, subject: 'Very Good', statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', time: '2 weeks ago' },
  { id: 3, name: 'Olabunmi', stars: 3, subject: 'Average', statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', time: '3 weeks ago' },
  { id: 4, name: 'Olabunmi', stars: 2, subject: 'Not Impressed', statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', time: '1 month ago' },
  { id: 5, name: 'Olabunmi', stars: 1, subject: 'Disappointed', statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', time: '2 months ago' },
];

const ReviewSection = () => {
  const [sortOption, setSortOption] = useState('newest');
  const [rating, setRating] = useState(0);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === 'newest') return b.id - a.id;
    if (sortOption === 'oldest') return a.id - b.id;
    return 0;
  });

return (
    <div className="w-full mt-20 font-lato">
        {/* Header with Sort Option */}
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-left">Review List</h2>
            <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort By:</span>
                <select
                    className="border px-2 py-1 rounded-md"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>
        </div>
        <p className="text-gray-500">Showing 1-4 of {reviews.length} results</p>
        <div className="grid grid-cols-1 md:grid-cols-1  gap-8 mt-8 w-full">
            {/* Left: Reviews List */}
            <div className="md:col-span-1 border-y-0 rounded-md">
                <div className="mt-4">
                    {sortedReviews.slice(0, 4).map((review) => (
                        <div key={review.id} className="border-b pb-4 mb-4">
                            <h3 className="font-semibold mt-16">{review.name}</h3>
                            <div className="flex items-center gap-1 text-yellow-500 mt-4">
                                {[...Array(review.stars)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                            <p className="font-semibold mt-4">{review.subject}</p>
                            <p className="text-gray-600 mt-3">{review.statement}</p>
                            <p className="text-gray-400 text-sm mt-4">{review.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

            {/* Right: Add Review Form */}

    <div className="mt-20 rounded-md">
    <h2 className="text-lg text-[#1B121B] font-semibold text-[24px]">Add Your Review</h2>
    <p className="text-[#F2F2F7] mt-4">Your email address will not be published. Required fields are marked *</p>
    
    <form className="mt-20 space-y-12">
        <div className="flex gap-4">
            <div className="w-1/2">
                <label className="block text-[#1B121B] mb-4 font-bold">Full Name *</label>
                <input type="text" placeholder="Enter your name here *" className="w-full bg-[#F2F2F7] px-6 py-5 rounded-[12px]" required />
            </div>
            <div className="w-1/2">
                <label className="block text-gray-700  mb-4 font-bold">Email *</label>
                <input type="email" placeholder="Enter your email here" className="w-full bg-[#F2F2F7]  px-6 py-5 rounded-[12px]" required />
            </div>
        </div>
        <div>
            <label className="block text-gray-700  mb-4 font-bold">Your Rating *</label>
            <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                    <FaStar 
                        key={i} 
                        className={`cursor-pointer ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                        onClick={() => setRating(i + 1)}
                    />
                ))}
            </div>
        </div>
        <div>
            <label className="block text-gray-700  mb-4 font-bold">Add Review Title *</label>
            <input type="text" placeholder="Ex.I like what i got" className="w-full bg-[#F2F2F7]  px-6 py-5 rounded-[12px]" required />
        </div>
        <div>
            <label className="block text-gray-700  mb-4 font-bold">Add Detailed Review *</label>
            <textarea placeholder="Ex.I like what i got" className="w-full bg-[#F2F2F7] px-6 py-[20px] rounded-[12px]" rows="4" required></textarea>
        </div>
        {/* <div>
            <label className="block text-gray-700  mb-4 font-bold">Photo/Video (Optional)</label>
            <div className="border border-dashed bg-[#F2F2F7] rounded-[12px] p-4 flex flex-col items-center justify-center h-32 relative">
                <img src={UploadImage} alt="" className="upload-image cursor-pointer" />
                <p className="text-gray-500 text-sm">Drag an image / Video here or <span className="text-[#E94E30] underline">Upload a file</span></p>
                <input type="file" className="opacity-0 absolute w-full h-full cursor-pointer" />
            </div>
        </div> */}
       
        <button type="submit" className=" w-[300px] bg-[#E94E30] text-white py-2 rounded-md transform transition-transform duration-300 hover:scale-100 hover:bg-[#D43C28]">Submit</button>
    </form>
</div>

    </div>
);
};

export default ReviewSection;
