import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import OurBlog from "../assets/images/our-blog.png";
import BlogImage from "../assets/images/more-blog1.png";
import BlogImage2 from "../assets/images/more-blog2.png";
import BlogImage3 from "../assets/images/more-blog3.png";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    image: BlogImage,
    date: "3 days ago",
    title: "Beach Essential Styles For Your Vacations",
    excerpt:
      "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam",
  },
  {
    id: 2,
    image: BlogImage2,
    date: "7 days ago",
    title: "Stylish And Stunning Outfit For Your Gym Section",
    excerpt:
      "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam",
  },
  {
    id: 3,
    image: BlogImage3,
    date: "7 days ago",
    title: "Top 5 Accessories to Complete Any Look",
    excerpt:
      "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam",
  },
    {
    id: 4,
    image: BlogImage2,
    date: "7 days ago",
    title: "Stylish And Stunning Outfit For Your Gym Section",
    excerpt:
      "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam",
  },
  
 
];

const UserBlogPage = () => {
  return (
    <div className="px-2 md:px-16 lg:px-24 py-12">
      {/* Header */}
      <div
        className="w-full bg-cover md:b md:rounded-2xl bg-center py-24 mb-4"
        style={{ backgroundImage: `url(${OurBlog})` }}
        >
        <div className="text-center px-6 md:px-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">
            Our Blog
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            Stay inspired with Our fashion news and blog
            </p>
        </div>
        </div>


      {/* Section Title */}
      <div className="flex items-center justify-between mb-8 mt-20">
        <h2 className="text-xl md:text-2xl font-semibold">News & Articles</h2>    
      </div>

      {/* Blog Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {Array(3) // repeat 3 sections to match your data
          .fill(blogPosts)
          .flat()
          .map((post, index) => (
            <div
              key={`${post.id}-${index}`}
              className="bg-white hover:cursor-pointer shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="p-6 w-full md:w-[270px] lg:w-[270px] mx-auto flex flex-col items-start">
                <img className="w-full md:w-[270px] md:h-[270px]" src={post.image} alt="" />
                {/* <p className="text-sm text-gray-400 mb-2">{post.date}</p> */}
                <h3 className="text-lg font-semibold mb-3 mt-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link to={`/blog`}>
                    <button className="text-black underline font-medium hover:underline mb-3">
                  Read More
                </button>
                </Link>
                
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-end gap-1 mt-12">
        <button className="flex items-center gap-1 px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100">
           Prev
        </button>
        <button className="px-3 py-1  rounded-lg bg-[#E94E30] text-white">
          1
        </button>
        <button className="px-3 py-1  rounded-lg hover:bg-gray-100">
          2
        </button>
        <button className="px-3 py-1 rounded-lg hover:bg-gray-100">
          3
        </button>
        <button className="flex items-center gap-1 px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100">
          Next 
        </button>
      </div>
    </div>
  );
};

export default UserBlogPage;
