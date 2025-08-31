import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

const BlogPost = () => {
  return <>
    <div className="container mx-auto px-4">
      {/* Breadcrumb Section */}
      <div className=" flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
       
         <Breadcrumb>
          <BreadcrumbList>
            {/* <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem> */}
            <BreadcrumbItem>
              <BreadcrumbPage>Ways to Style Your Favorite Leather Jacket</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
    
        <button className=''>Create New Post</button>
      </div>

        {/* Blog Content Section */}
        <div className="blog-page2">
        </div>

      {/* Title & Meta Info */}
      <div className=" mx-auto flex flex-col  mt-2">
        <h1 className=" pt-3 md:pt-8 text-3xl font-bold">Ways to Style Your Favorite Leather Jacket</h1>
      </div>

      {/* Blog Content Section */}
      <div className="blog-content mt-2 space-y-1 text-gray-700 leading-relaxed">
        {/* First Paragraph */}
        <div className="">
          <p>
            Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        {/* Second Paragraph */}
        <div className="py-5">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Fermentum Venenatis Tortor</h2>
          <p>
            Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        {/* Third Paragraph */}
        <div className="py-5">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Parturient Venenatis Etiam</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Vestibulum eu quam nec neque pellentesque efficitur id eget nisl.</li>
            <li>Aliquam porta nisl dolor, molestie pellentesque elit molestie in.</li>
            <li>Aliquam pulvinar vestibulum blandit. Donec sed nisl libero.</li>
            <li>Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.</li>
            
          </ul>
        </div>

        
        
      </div>
 
    </div>
   
  </>
};

export default BlogPost;
