import React from "react";
import moreBlog1 from '../assets/images/more-blog1.png'
import moreBlog2 from '../assets/images/more-blog2.png'
import moreBlog3 from '../assets/images/more-blog3.png'
import moreBlog4 from '../assets/images/more-blog4.png'


const cards = [
  {
    id: 1,
    image: moreBlog1,
    title: "Beach Essential Styles For Your Vacations",
    description: "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam",
  },
  {
    id: 2,
    image: moreBlog2,
    title: "Stylish And Stunning Outfit For Your Gym Section",
    description: "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam",
  },
  {
    id: 3,
    image: moreBlog3,
    title: "Top 5 Accessories to Complete Any Look",
    description: "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam",
  },
  {
    id: 4,
    image: moreBlog4,
    title: "Ways to Style Your Favorite Oversized Sweater",
    description: "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam",
  },
];

const MoreBlogs = () => {
  return (
    <div className="mx-auto py-8 pb-[60px]">
        <h1 className="more-blogs">More Blogs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
              <img src={card.image} alt={card.title} className="w-full h-56 object-cover" />
              <div className="days-ago absolute bottom-0 right-0 bg-[#E94E30] text-white text-xs px-4 py-1">
                3 days ago
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold more-blog-title">{card.title}</h2>
              <p className="text-gray-600 text-sm mt-2 more-blog-description">{card.description}</p>
              <button className="more-blog-read-more mt-4 font-semibold hover:underline underline hover:text-[#E94E30] underline-offset-[4px]">
                Read More 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreBlogs;
