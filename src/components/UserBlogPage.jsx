import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import OurBlog from "../assets/images/our-blog.png";
import { Link } from "react-router-dom";
import useGetBlogs from "@/hooks/api/queries/blogs/useGetBlogs";

const UserBlogPage = () => {
  const [page, setPage] = useState(1);

  // Pass pagination params if your hook supports it
  const { data: blogs, isPending } = useGetBlogs({ page, limit: 10 });

  if (isPending) return <p>Loading...</p>;

  const blogItems = blogs?.data?.blogs?.items || [];
  const pagedInfo = blogs?.data?.blogs?.pagedInfo;

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
        {blogItems.length > 0 ? (
          blogItems.map((post) => (
            <div
              key={post._id}
              className="bg-white hover:cursor-pointer shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="p-6 w-full md:w-[270px] lg:w-[270px] mx-auto flex flex-col items-start">
                <img
                  className="w-full md:w-[270px] md:h-[270px] object-contain"
                  src={post.image}
                  alt={post.title}
                />
                <h3 className="text-lg font-semibold mb-3 mt-3">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.content}
                </p>
                <Link to={`/blog/${post._id}`}>
                  <button className="text-black underline font-medium hover:underline mb-3">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>

      {/* Pagination */}
      {pagedInfo && (
        <div className="flex justify-end items-center gap-2 mt-12">
          <button
            className="flex items-center gap-1 px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={!pagedInfo.hasPrevious}
          >
            <ArrowLeft size={16} /> Prev
          </button>

          {/* Render page numbers dynamically */}
          {Array.from(
            { length: Math.ceil(pagedInfo.total / pagedInfo.limit) },
            (_, i) => i + 1
          ).map((pg) => (
            <button
              key={pg}
              onClick={() => setPage(pg)}
              className={`px-3 py-1 rounded-lg ${
                pg === page
                  ? "bg-[#E94E30] text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {pg}
            </button>
          ))}

          <button
            className="flex items-center gap-1 px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!pagedInfo.hasNext}
          >
            Next <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserBlogPage;
