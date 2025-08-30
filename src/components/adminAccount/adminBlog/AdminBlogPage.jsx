import { useMemo, useState, useRef } from "react";
// import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Access from "../../../assets/images/access3.png";
import Blog1 from "../../../assets/images/more-blog1.png";
import { Card, CardContent } from "@/components/ui/card";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const posts = [
  {
    id: 1,
    image: Access,
    title: "Ways to Style Your Favorite Leather Jacket",
    excerpt:
      "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam, Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam",
    date: "Feb 13, 2025",
  },
  {
    id: 2,
    image: Blog1,
    title: "Beach Essential Styles For Your Vacations",
    excerpt:
      "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam, Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam",
    date: "Feb 13, 2025",
  },
  {
    id: 3,
    image: Blog1,
    title: "Beach Essential Styles For Your Vacations",
    excerpt:
      "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam, Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam",
    date: "Feb 13, 2025",
  },
  {
    id: 4,
    image: Access,
    title: "Beach Essential Styles For Your Vacations",
    excerpt:
      "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam, Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam",
    date: "Feb 13, 2025",
  },
  // ... repeat the same structure for other posts ...
];

export default function AdminBlogPage() {
  const [query,] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const [, setDeleteCustomer] = useState(null);
  const pageSize = 6;
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.date.toLowerCase().includes(q)
    );
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageStart = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(pageStart, pageStart + pageSize);

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(pageCount, p + 1));
  const goto = (n) => setCurrentPage(() => Math.min(Math.max(1, n), pageCount));

  const handleViewOrder = (customer) => {
    navigate("/admin/blog-post", { state: { customer } });
  };

  return (
    <div className="w-full md:px-10 ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Blogs</h1>
        </div>
        <Button
          className="rounded-2xl px-4 h-11 shadow-sm"
          onClick={() => alert("Create New Post")}
        >
          <Plus className="mr-2 h-5 w-5" /> Create New Post
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-2 w-full">
        {pageItems.map((post) => (
          // <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card
            key={post.id}
            className="rounded-2xl shadow-sm border hover:shadow-md cursor-pointer transition-shadow md:w-[534px] relative"
          >
            <CardContent className="p-3 space-y-1">
              <div className="grid-cols-1 sm:grid-cols-2 gap-2 flex">
                <img
                  src={post.image}
                  alt="Blog Post"
                  className="h-32 w-32 rounded-lg object-cover mr-4"
                />
                <div className="left">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-[16px] font-semibold leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <BsThreeDots
                        onClick={() =>
                          setMenuOpen(menuOpen === post.id ? null : post.id)
                        }
                        className="h-5 w-5 text-black cursor-pointer float-right"
                      />
                      {menuOpen === post.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-2 top-8 z-20 bg-white border rounded shadow p-2 min-w-[178px]"
                        >
                          <button
                            className="w-full text-center px-1 py-2 rounded hover:text-gray-800 hover:bg-gray-200 font-semibold"
                            onClick={() => {
                              setMenuOpen(null);
                              handleViewOrder(post);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full text-center px-2 py-2 text-[#E94E30] hover:bg-red-50 rounded"
                            onClick={() => {
                              setDeleteCustomer(post);
                              setMenuOpen(null);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-6">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex justify-end pt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground ">
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          // </motion.div>
        ))}
      </div>

      {pageItems.length === 0 && (
        <div className="text-center text-muted-foreground py-16">
          No posts found.
        </div>
      )}

      <div className="mt-10 flex items-center justify-end gap-2 flex-wrap">
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
          <Button
            key={n}
            variant={currentPage === n ? "default" : "outline"}
            className="rounded-xl w-10"
            onClick={() => goto(n)}
          >
            {n}
          </Button>
        ))}
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={handleNext}
          disabled={currentPage === pageCount}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
