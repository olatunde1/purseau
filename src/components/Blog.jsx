import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Blog1 from '../assets/images/blog1.png'
import Blog2 from '../assets/images/blog2.png'

const items = [
  {
    id: 1,
    image: Blog1,
    title: "Beach Essential Styles For Your Vacations",
    description: "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam",
  },
  {
    id: 2,
    image: Blog2,
    title: "Stylish And Stunning Outfit For Your Gym Section",
    description: "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam.",
  },

];

const CardCarousel = () => {
  return <>
  <div className="news-blog">
  <div className="brand">
        <h1>News & Blogs</h1>
        <p>In a laoreet purus. Integer turpis quam, laoreet id orci nec, <br />ultrices lacinia nunc. Aliquam erat vo</p>
    </div>

    <div className=" max-w-4xl mx-auto py-20 ">
      <Carousel className="relative news-blog-card ">
        <CarouselContent className=" gap-4">
          {items.map((item) => (
            <CarouselItem key={item.id} className="p-2">
              <Card className="shadow-lg overflow-hidden">
                <img src={item.image} alt={item.title} className="blog-images" />
                <CardContent className="p-4 blog-card-details ">
                  <h3 className="blog-card-title">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <a href="#" className="text-black-600 underline text-sm mt-2 inline-block">
                   Read More
                  </a>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons (Bottom Right) */}
        <div className="absolute bottom-0 right-0 mt-20 flex space-x-2 p-4 carouselDirection ">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  </div>
  
  </>
    

};

export default CardCarousel;






