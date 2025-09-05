import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import useGetBlogs from "@/hooks/api/queries/blogs/useGetBlogs.jsx";


const CardCarousel = () => {

    const {data: blogs, isPending} = useGetBlogs()

    if (isPending) return <p>Loading...</p>;

    // Safely get the latest 2 blogs
    const latestBlogs = blogs?.data?.blogs?.items
        ?.slice() // clone array
        ?.reverse() // newest first
        ?.slice(0, 2); // take only 2
    return (
        <>
            <div className="news-blog pb-16 lg:pb-20">
                <div className="brand pt-10 lg:pt-20">
                    <h1>News & Blogs</h1>
                    <p className="lg:w-[436px] mx-auto px-3">
                        In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo
                    </p>
                </div>

                <div className="w-full lg:max-w-4xl mx-auto  lg:py-5 px-2 sm:px-6 lg:px-8 relative">
                    <Carousel className="relative news-blog-card ">
                        <CarouselContent className="mx-auto">
                            {latestBlogs.map((item, idx) => (
                                <CarouselItem key={item._id} className="p-2">
                                    <Card className="shadow-sm overflow-hidden">
                                        <img src={item.image} alt={item.title} className="w-full h-[450px] object-contain" />
                                        <CardContent className="p-4">
                                            <h3 className="blog-card-title">{item.title}</h3>
                                            <p className="text-gray-600">{item.content}</p>
                                            <a href={`/blog/${item._id}`} className="text-black-600 underline text-sm mt-2 inline-block">
                                                Read More
                                            </a>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Navigation Buttons (hidden on mobile, visible on sm and up) */}
                        <div className="hidden sm:flex absolute bottom-0 lg:right-0 mt-20 space-x-2 p-4 mr-20 lg:mr-0 carouselDirection
                            left-1/2 -translate-x-1/2 right-auto justify-center
                            sm:right-0 sm:left-auto sm:translate-x-0 sm:justify-end
                        ">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </Carousel>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-4 space-x-2">
                        {latestBlogs.map((_, idx) => (
                            <span
                                key={idx}
                                className={`block w-3 h-3 rounded-full ${
                                    idx === 0 ? "bg-[#E94E30]" : "bg-gray-300"
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )


};

export default CardCarousel;








