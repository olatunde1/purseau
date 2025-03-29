import { useEffect } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { StayLoop } from "@/components/StayLoop"
// import { Footer } from "@/components/Footer"
  
  export default function Policy() {
    useEffect(() => {
      // Scroll to top when component mounts
      window.scrollTo(0, 0)
    }, [])

    return <>
      <div className="container max-w-4xl mx-auto px-4 py-8">
         <h1 className="terms-conditions">
        Terms and Conditions of The Use of Purseau for Our Retailers, Wholesalers, and Dropshippers
      </h1>

        <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-1">
        <AccordionItem value="item-1" className="border rounded-lg">
          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
            <h2 className="text-lg font-semibold">1. Data Collection</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 py-4">
              <p className="text-gray-700 mb-4 leading-relaxed">
                1.1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              {/* Paragraph 1.2 */}
              <p className="text-gray-700 mb-4">
                1.2 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>

              {/* Paragraph 1.3 */}
              <p className="text-gray-700 mb-4">
                1.3 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo</li>
                <li>Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed posuere egestas nunc ut tempus. Fu</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu mollis felis. Maecenas sed dui o</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
              </ul>
              <ul className="list-disc pl-6 text-gray-700">
                <li>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo</li>
                <li>Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed posuere egestas nunc ut tempus. Fu</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu mollis felis. Maecenas sed dui o</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
              </ul>
              <ul className="list-disc pl-6 text-gray-700">
                <li>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo</li>
                <li>Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed posuere egestas nunc ut tempus. Fu</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu mollis felis. Maecenas sed dui o</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border rounded-lg">
          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
            <h2 className="text-lg font-semibold">2. Use of Information</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 py-4">
              <p className="text-gray-700 mb-4">
                2.1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              {/* Paragraph 1.2 */}
              <p className="text-gray-700 mb-4">
                2.2 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
              </ul>
              <p className="text-gray-700 mb-4">
                2.3 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border rounded-lg">
          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
            <h2 className="text-lg font-semibold">3. Data Protection</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 py-4">
              <p className="text-gray-700 mb-4">
                3.1 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
              </ul>
              <p className="text-gray-700 mb-4">
                3.2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              {/* Paragraph 1.2 */}
              <p className="text-gray-700 mb-4">
                3.3 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border rounded-lg">
          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
            <h2 className="text-lg font-semibold">4. Third-Party Sharing</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 py-4">
              <p className="text-gray-700 mb-4">
                4.1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              {/* Paragraph 1.2 */}
              
              <p className="text-gray-700 mb-4">
                4.2 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>

              <p className="text-gray-700 mb-4">
                4.3 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border rounded-lg">
          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
            <h2 className="text-lg font-semibold">5. Payment Security</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 py-4">
              <p className="text-gray-700 mb-4">
                5.1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              {/* Paragraph 1.2 */}
              
              <p className="text-gray-700 mb-4">
                5.2 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>

              <p className="text-gray-700 mb-4">
                5.3 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="border rounded-lg">
          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
            <h2 className="text-lg font-semibold">6. Cookies & Tracking</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 py-4">
              <p className="text-gray-700 mb-4 leading-relaxed">
                6.1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              {/* Paragraph 1.2 */}
              
              <p className="text-gray-700 mb-4">
                6.2 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>

              <p className="text-gray-700 mb-4">
                6.3 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7" className="border rounded-lg">
          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
            <h2 className="text-lg font-semibold">7. Returns & Refund Policy</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 py-4">
              <p className="text-gray-700 mb-4 leading-relaxed">
                7.1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              {/* Paragraph 1.2 */}
              
              <p className="text-gray-700 mb-4">
                7.2 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>

              <p className="text-gray-700 mb-4">
                7.3 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8" className="border rounded-lg">
          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
            <h2 className="text-lg font-semibold">8. Policy Updates</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 py-4">
              <p className="text-gray-700 mb-4 leading-relaxed">
                8.1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              {/* Paragraph 1.2 */}
              
              <p className="text-gray-700 mb-4">
                8.2 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>

              <p className="text-gray-700 mb-4">
                8.3 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9" className="border rounded-lg">
          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
            <h2 className="text-lg font-semibold">9. Contact Us</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 py-4">
              <p className="text-gray-700 mb-4 leading-relaxed">
                9.1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              {/* Paragraph 1.2 */}
              
              <p className="text-gray-700 mb-4">
                9.2 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>

              <p className="text-gray-700 mb-4">
                9.3 Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
                <li>Ullamcorper morbi tincidunt ornare massa eget. Quam viverra orci sagittis eu volutpat odio facilisis</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
      <StayLoop />
      {/* <Footer /> */}
    </>
  };
  