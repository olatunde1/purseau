
const MoreBlogs = ({ blogs = [] }) => {
    return (
        <div className="mx-auto py-8 pb-[60px]">
            <h1 className="more-blogs">More Blogs</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {blogs.map((blog) => (
                    <div key={blog._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative">
                            <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover" />
                            <div className="days-ago absolute bottom-0 right-0 bg-[#E94E30] text-white text-xs px-4 py-1">
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold more-blog-title">{blog.title}</h2>
                            <p className="text-gray-600 text-sm mt-2 more-blog-description line-clamp-3">
                                {blog.content}
                            </p>
                            <a  href={`/blog/${blog._id}`} className="more-blog-read-more mt-4 font-semibold hover:underline underline hover:text-[#E94E30] underline-offset-[4px]">
                                Read More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoreBlogs;
