import Download from '../../../assets/images/download-icon.png'; // Adjust the path as necessary
import { useState } from 'react';
import { X } from "react-feather"; // or any icon lib you like

function CreateProduct() {
  const [form, setForm] = useState({});


  const categories = ["Shoes", "Clothing", "Bags", "Accessories"];
  const discounts = ["0%", "5%", "10%", "15%", "20%"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };



  const handleRemoveImages = () => {
    setImages([]);
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      images, // In real app, handle file upload separately
    };
    console.log("Product to submit:", payload);
    alert("Product submitted. Check console for payload.");
  };

 const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleColorChange = (e) => {
    const value = e.target.value;
    if (value && !selectedColors.includes(value)) {
      setSelectedColors([...selectedColors, value]);
    }
    e.target.value = ""; // reset dropdown
  };

  const handleSizeChange = (e) => {
    const value = e.target.value;
    if (value && !selectedSizes.includes(value)) {
      setSelectedSizes([...selectedSizes, value]);
    }
    e.target.value = ""; // reset dropdown
  };

  const removeColor = (color) => {
    setSelectedColors(selectedColors.filter((c) => c !== color));
  };

  const removeSize = (size) => {
    setSelectedSizes(selectedSizes.filter((s) => s !== size));
  };

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => {
      const newImages = [...prev, ...files];
      return newImages.slice(0, 4); // limit to 4
    });
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

return (
    <div className="bg-white shadow-md rounded-xl p-6">
        <div className="px-10 flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Create Product</h1>
            <div className="left">
                <div className="flex space-x-4">
                    <button className="border border-[#878787] text-black px-6 py-2 rounded-xl">Archive Product</button>
                    <button onClick={handleSubmit} className="bg-[#E94E30] text-white px-6 py-2 rounded-xl">Add Product</button>
                </div>
                    </div>
            </div>
            <div className="px-4 mx-10 py-6  space-y-8  rounded-xl">
         
        <h1 className="text-xl font-semibold">Product Information</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            <div>
                <label className="font-semibold">Product ID</label>
                <input disabled value="DS-FG72TSOQ" className="w-full px-6 py-3 border rounded-xl mt-3" />
            </div>

            <div>
                <label className="font-semibold">Product Name</label>
                <input name="productName" placeholder="Enter the product name" onChange={handleChange} className="w-full px-6 py-3 border rounded-xl mt-3" />
            </div>

            <div>
                <label className="font-semibold">Category</label>
                <select name="category" onChange={handleChange} className="w-full px-6 py-3 border rounded-xl mt-3">
                    <option value="">Select category</option>
                    {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="font-semibold">Brand</label>
                <input name="brand" placeholder="Enter the product brand" onChange={handleChange} className="w-full px-6 py-3 border rounded-xl mt-3" />
            </div>

            <div>
                <label className="font-semibold">Material</label>
                <input name="material" placeholder="Enter the product material" onChange={handleChange} className="w-full px-6 py-3 border rounded-xl mt-3" />
            </div>

            <div>
                <label className="font-semibold">Quantity</label>
                <input type="number" name="quantity" placeholder="Enter the quantity" onChange={handleChange} className="w-full px-6 py-3 border rounded-xl mt-3" />
            </div>

            <div>
                <label className="font-semibold">Price $</label>
                <input type="number" name="price" placeholder="Enter the product price" onChange={handleChange} className="w-full px-6 py-3 border rounded-xl mt-3" />
            </div>

            <div>
                <label className="font-semibold">Discount %</label>
                <select name="discount" onChange={handleChange} className="w-full px-6 py-3 border rounded-xl mt-3">
                    <option value="">Select Discount</option>
                    {discounts.map((disc, idx) => (
                        <option key={idx} value={disc}>{disc}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="font-semibold">Weight, kg</label>
                <input type="number" name="weight" placeholder="Enter the product weight" onChange={handleChange} className="w-full px-6 py-3 border rounded-xl mt-3" />
            </div>
            {/* Checkbox inserted here */}
            <div className="flex items-center mt-3">
                <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    onChange={e => setForm({ ...form, featured: e.target.checked })}
                    className="mr-2"
                />
                <label htmlFor="featured" className="font-semibold">Add price variants for wholesale</label>
            </div>
        </div>
                    
        <div className="grid grid-cols-1 gap-6 md:pb-6">
        <div className="flex w-[250px] rounded-xl overflow-hidden border h-12">
            <label className="w-[96px] font-semibold flex items-center justify-center bg-[#F2F2F7]">
            3-12 pc
            </label>
            <input
            name="price3to12"
            placeholder="Enter the price"
            onChange={handleChange}
            className="flex-1 px-3 outline-none w-[154px]"
            />
        </div>

        <div className="flex w-[250px] rounded-xl overflow-hidden border h-12">
            <label className="w-[96px] font-semibold flex items-center justify-start px-5 bg-[#F2F2F7]">
            13+
            </label>
            <input
            name="price13plus"
            placeholder="Enter the price"
            onChange={handleChange}
            className="flex-1 px-3 outline-none w-[154px]"
            />
        </div>
        </div>


            </div>

            {/* Variants Section */}

            <div className="flex gap-6 py-10 mt-6 mx-10 rounded-xl">
                    <div className="w-[850px] md:grid-cols-1 gap-6 px-5">
                        <div className="space-y-4 pb-8 ">
                            <div className="flex justify-between">
                                <h2 className="text-xl font-semibold">Variants</h2>
                                <p className="text-[#E94E30] font-semibold">Add new variant</p>
                            </div>
                        </div>
                    <div>
                 <div>
      {/* Color */}
      <label className="font-semibold">Color</label>
      <select
        name="color"
        onChange={handleColorChange}
        className="w-full p-3 md:p-5 border rounded-xl mt-2 mb-3"
      >
        <option value="">Select color</option>
        <option>White</option>
        <option>Black</option>
        <option>Gold</option>
        <option>Purple</option>
        <option>Blue</option>
        <option>Yellow</option>
      </select>

      {/* Selected colors */}
      <div className="flex flex-wrap gap-2 mb-5">
        {selectedColors.map((color) => (
          <span
            key={color}
            className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-full text-sm"
          >
            {color}
            <button
              type="button"
              onClick={() => removeColor(color)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      {/* Size */}
      <label className="font-semibold">Size</label>
      <select
        name="size"
        onChange={handleSizeChange}
        className="w-full p-3 md:p-5 border rounded-xl mt-2 mb-3"
      >
        <option value="">Select size</option>
        <option>EU 35</option>
        <option>EU 35-36</option>
        <option>EU 36</option>
        <option>EU 38</option>
        <option>EU 42</option>
        <option>EU 42-43</option>
      </select>

      {/* Selected sizes */}
      <div className="flex flex-wrap gap-2">
        {selectedSizes.map((size) => (
          <span
            key={size}
            className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-full text-sm"
          >
            {size}
            <button
              type="button"
              onClick={() => removeSize(size)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
                    </div>
          
                    </div>

                    <div className="w-full gap-6 px-5">

                        <div>
                            <label className="font-semibold">Product Summary</label>
                            <textarea name="summary" placeholder="Add short description for product" onChange={handleChange} className="w-full p-20 border rounded-xl mt-4 mb-4" />
                        </div>
                        <div>
                            <label className="font-semibold">Product Description</label>
                            <textarea name="description" placeholder="Add product full description" onChange={handleChange} className="w-full p-20 border rounded-xl mt-4" />
                        </div>
                    </div>
            </div>

   <div className="grid gap-6 py-10 mt-6 mx-10 rounded-xl" >
      <h2 className="text-xl font-semibold mb-2">Product Images</h2>
      <div className="flex gap-4">
        
        {/* Upload box - hide if already 4 images */}
        {images.length < 4 && (
          <label
            htmlFor="fileUpload"
            className="w-24 md:w-[194px] h-24 md:h-[194px] grid items-center justify-center border-2 border-dashed rounded cursor-pointer  text-[#5B5B5B] font-semibold text-xs text-center"
          >
            <img src={Download} alt="" height="24px" width="24px" />
            Drag and drop here or <span className=' text-[#E94E30] font-semibold'>Choose a file</span> to upload 
            
            <p className='text-[#5B5B5B] font-semibold'>Max 10MB size</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              hidden
              id="fileUpload"
            />
          </label>
        )}

        {/* Image previews */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative w-24 h-24 md:w-[194px] md:h-[194px] border rounded overflow-hidden"
          >
            <img
              src={URL.createObjectURL(img)}
              alt={`preview-${idx}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(idx)}
              className="absolute top-1 right-1 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>

        
            
    </div>
    
    
);
}

export default CreateProduct;
