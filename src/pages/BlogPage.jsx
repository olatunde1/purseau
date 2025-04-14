import React from 'react'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import MoreBlogs from '@/components/MoreBlogs'
import { StayLoop } from '@/components/StayLoop'
import { Footer } from '@/components/Footer'

const BlogPage = () => {
  return <>
    <div className="container mx-auto px-4">
      {/* Breadcrumb Section */}
      <div className="breadcrumb mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

        {/* Blog Content Section */}
        <div className="blog-page"></div>

      {/* Title & Meta Info */}
      <div className="style-favorite flex flex-col items-center text-center mt-6">
        <h1 className="ways-style text-3xl font-bold">Ways to Style Your Favorite Leather Jacket</h1>
        <div className="flex h-5 items-center space-x-4 text-sm mt-2 text-gray-500">
          <p>14 March 2025</p>
          <Separator className="separator" orientation="vertical" />
          <p>12 min Read</p>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="blog-content mt-8 space-y-6 text-gray-700 leading-relaxed">
        {/* First Paragraph */}
        <div className="first-paragraph">
          <p>
            Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        {/* Second Paragraph */}
        <div className="second-paragraph">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Fermentum Venenatis Tortor</h2>
          <p>
            Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        {/* Third Paragraph */}
        <div className="third-paragraph">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Parturient Venenatis Etiam</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Vestibulum eu quam nec neque pellentesque efficitur id eget nisl.</li>
            <li>Aliquam porta nisl dolor, molestie pellentesque elit molestie in.</li>
            <li>Aliquam pulvinar vestibulum blandit. Donec sed nisl libero.</li>
            <li>Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.</li>
            
            <li>Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.</li>
            <li>Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.</li>
          </ul>
        </div>

        <div className="second-paragraph">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Fermentum Venenatis Tortor</h2>
          <p>
            Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <p className='last-para pt-[24px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        
      </div>
      <MoreBlogs />
    </div>
    <StayLoop />
    <Footer />
  </>
};

export default BlogPage;
