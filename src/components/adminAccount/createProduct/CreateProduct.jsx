import useCreateProducts from "@/hooks/api/mutation/admin/useCreateProducts";
import Download from "../../../assets/images/admin-create-product-upload.png";
import { useState } from "react";
import { X } from "react-feather";
import { toast } from "sonner";

function CreateProduct() {
  const [form, setForm] = useState({});
  const [images, setImages] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const { mutate, isPending } = useCreateProducts();

  // const categories = ["Shoes", "Clothing", "Bags", "Accessories"];
  const categoryOptions = [
    "clothes",
    "jewelries",
    "bags",
    "shoes",
    "accessories",
    "beauties",
    "electronics",
    "home",
    "animals",
    "others",
  ];

  const discounts = ["0%", "5%", "10%", "15%", "20%"];
  const subCategoryOptions = {
    clothes: [
      "jeans",
      "t-shirts",
      "underwear",
      "sport wear",
      "suits",
      "dresses",
    ],
    jewelries: ["rings", "necklaces", "bracelets", "earrings"],
    bags: ["handbags", "backpacks", "luggage", "wallets"],
    shoes: ["sneakers", "sandals", "formal shoes", "boots"],
    accessories: ["hats", "belts", "gloves", "scarves"],
    beauties: ["makeup", "skincare", "fragrances", "hair products"],
    electronics: ["phones", "laptops", "headphones", "cameras"],
    home: ["furniture", "kitchenware", "decor", "bedding"],
    animals: ["dogs", "cats"],
    others: ["other"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // const handleSubmit = () => {
  //   const payload = { ...form, images };
  //   console.log("Product to submit:", payload);
  //   alert("Product submitted. Check console for payload.");
  // };

  const handleSubmit = () => {
    // build the nested pricing object
    const pricing = {
      perQuantity: {
        onePiece: Number(form.price) || 0,
        twoToFive: Number(form.price3to12) || 0,
        fiveToTen: Number(form.price13plus) || 0,
      },
      discountAmount: form.discountAmount ? Number(form.discountAmount) : 0,
      percentageDiscount: form.discount
        ? Number(form.discount.replace("%", ""))
        : 0,
      priceRange: {
        minPrice: form.minPrice ? Number(form.minPrice) : 0,
        maxPrice: form.maxPrice ? Number(form.maxPrice) : 0,
      },
    };

    // combine everything into the final backend shape
    const payload = {
      name: form.productName,
      availableQuantity: Number(form.quantity) || 0,
      availableColors: selectedColors,
      description: form.description || form.summary || "",
      weight: Number(form.weight) || 0,
      color: selectedColors || "",
      size: selectedSizes.length ? selectedSizes : [],
      // images,
      material: form.material || "",
      // pricing,
      category: form.category?.toLowerCase() || "",
      brand: form.brand ? form.brand.split(",").map((b) => b.trim()) : [],
      subCategory: form.subCategory || "formal shoes",
    };

    const formData = new FormData();

    // Object.keys(payload).forEach((key) => {
    //   const value = payload[key];
    //   if (value !== undefined && value !== null) {
    //     formData.append(key, value.toString());
    //   }
    // });

    Object.keys(payload).forEach((key) => {
      const value = payload[key];

      if (value !== undefined && value !== null) {
        if (Array.isArray(value) || typeof value === "object") {
          // Convert arrays/objects to JSON string
          formData.append(key, JSON.stringify(value));
        } else {
          // Leave primitives as-is
          formData.append(key, value.toString());
        }
      }
    });


    formData.append(
      "pricing[perQuantity][onePiece]",
      pricing.perQuantity.onePiece.toString()
    );
    formData.append(
      "pricing[perQuantity][twoToFive]",
      pricing.perQuantity.twoToFive.toString()
    );
    formData.append(
      "pricing[perQuantity][fiveToTen]",
      pricing.perQuantity.fiveToTen.toString()
    );
    formData.append(
      "pricing[discountAmount]",
      pricing.discountAmount.toString()
    );
    formData.append(
      "pricing[percentageDiscount]",
      pricing.percentageDiscount.toString()
    );
    formData.append(
      "pricing[priceRange][minPrice]",
      pricing.priceRange.minPrice.toString()
    );
    formData.append(
      "pricing[priceRange][maxPrice]",
      pricing.priceRange.maxPrice.toString()
    );

    Object.values(images).forEach((file) => {
      if (file instanceof File) {
        formData.append("images", file);
      }
    });

    console.log("Submitting product payload:", payload);

    mutate(formData, {
      onSuccess: () => {
        toast.success("✅ Product created successfully!");
      },
      onError: (error) => {
        console.error("Error creating product:", error);
        toast.error("❌ Failed to create product. Check console for details.");
      },
    });
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    if (value && !selectedColors.includes(value)) {
      setSelectedColors([...selectedColors, value]);
    }
  };

  const handleSizeChange = (e) => {
    const value = e.target.value;
    if (value && !selectedSizes.includes(value)) {
      setSelectedSizes([...selectedSizes, value]);
    }
    e.target.value = "";
  };

  const removeColor = (color) =>
    setSelectedColors(selectedColors.filter((c) => c !== color));

  const removeSize = (size) =>
    setSelectedSizes(selectedSizes.filter((s) => s !== size));

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files].slice(0, 4)); // limit to 4
  };

  const handleRemoveImage = (index) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
        <h1 className="text-xl sm:text-2xl font-semibold">Create Product</h1>

        <div className="flex flex-wrap gap-3">
          <button className="border border-[#878787] text-black px-5 py-2 rounded-xl hover:bg-gray-50 transition">
            Archive Product
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-[#E94E30] text-white px-6 py-2 rounded-xl hover:bg-[#d74327] transition"
          >
            {isPending ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-3">
        {/* Header */}

        {/* Product Info */}
        <div className="px-2 sm:px-4 md:px-3 py-4 space-y-6">
          <h1 className="text-lg sm:text-xl font-semibold">
            Product Information
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="font-semibold text-sm md:text-base">
                Product ID
              </label>
              <input
                disabled
                value="DS-FG72TSOQ"
                className="w-full px-4 py-3 border rounded-xl mt-2"
              />
            </div>

            <div>
              <label className="font-semibold text-sm md:text-base">
                Product Name
              </label>
              <input
                name="productName"
                placeholder="Enter the product name"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl mt-2"
              />
            </div>

            {/* <div>
              <label className="font-semibold text-sm md:text-base">
                Category
              </label>
              <select
                name="category"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl mt-2"
              >
                <option value="">Select category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div> */}
            {/* Category Select */}
            <div>
              <label className="font-semibold text-sm md:text-base">
                Category
              </label>
              <select
                name="category"
                value={form.category || ""}
                onChange={(e) => {
                  handleChange(e);
                  // reset subcategory when category changes
                  setForm((prev) => ({ ...prev, subCategory: "" }));
                }}
                className="w-full px-4 py-3 border rounded-xl mt-2"
              >
                <option value="">Select category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Select */}
            <div>
              <label className="font-semibold text-sm md:text-base">
                Subcategory
              </label>
              <select
                name="subCategory"
                value={form.subCategory || ""}
                onChange={handleChange}
                disabled={!form.category}
                className="w-full px-4 py-3 border rounded-xl mt-2"
              >
                <option value="">Select subcategory</option>
                {form.category &&
                  subCategoryOptions[form.category]?.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-sm md:text-base">
                Brand
              </label>
              <input
                name="brand"
                placeholder="Enter brand"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl mt-2"
              />
            </div>

            <div>
              <label className="font-semibold text-sm md:text-base">
                Material
              </label>
              <input
                name="material"
                placeholder="Enter material"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl mt-2"
              />
            </div>

            <div>
              <label className="font-semibold text-sm md:text-base">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl mt-2"
              />
            </div>

            <div>
              <label className="font-semibold text-sm md:text-base">
                Price $
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl mt-2"
              />
            </div>

            <div>
              <label className="font-semibold text-sm md:text-base">
                Discount %
              </label>
              <select
                name="discount"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl mt-2"
              >
                <option value="">Select discount</option>
                {discounts.map((disc, idx) => (
                  <option key={idx} value={disc}>
                    {disc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-sm md:text-base">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                placeholder="Enter weight"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl mt-2"
              />
            </div>
          </div>

          {/* Checkbox + Price Variants */}
          <div className="mt-3 flex flex-col gap-4">
            <label className="flex items-center gap-2 text-sm md:text-base">
              <input
                type="checkbox"
                checked={form.showVariants || false}
                onChange={(e) =>
                  setForm({ ...form, showVariants: e.target.checked })
                }
              />
              Add price variants for wholesale
            </label>

            {/* Conditionally Render Price Variant Section */}
            {form.showVariants && (
              <div className="flex flex-col sm:flex-row gap-3 animate-fadeIn">
                <div className="flex w-full sm:w-[280px] rounded-xl overflow-hidden border h-12">
                  <label className="w-[96px] flex items-center justify-center bg-[#F2F2F7] font-semibold">
                    3–12 pc
                  </label>
                  <input
                    name="price3to12"
                    placeholder="Enter price"
                    onChange={handleChange}
                    className="flex-1 px-3 outline-none"
                  />
                </div>

                <div className="flex w-full sm:w-[250px] rounded-xl overflow-hidden border h-12">
                  <label className="w-[96px] flex items-center justify-center bg-[#F2F2F7] font-semibold">
                    13+
                  </label>
                  <input
                    name="price13plus"
                    placeholder="Enter price"
                    onChange={handleChange}
                    className="flex-1 px-3 outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Variants Section */}
        <div className="flex flex-col md:flex-row gap-8 py-8 mt-6 border-t">
          {/* Left */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between">
              <h2 className="text-lg sm:text-xl font-semibold">Variants</h2>
              <p className="text-[#E94E30] font-semibold">+ Add new variant</p>
            </div>

            {/* Color */}
            <div>
              <label className="font-semibold text-sm md:text-base">
                Color
              </label>
              <select
                onChange={handleColorChange}
                className="w-full p-3 border rounded-xl mt-2 mb-3"
              >
                <option value="">Select color</option>
                {["White", "Black", "Gold", "Purple", "Blue", "Yellow"].map(
                  (c) => (
                    <option key={c}>{c}</option>
                  )
                )}
              </select>

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
            </div>

            {/* Size */}
            <div>
              <label className="font-semibold text-sm md:text-base">Size</label>
              <select
                onChange={handleSizeChange}
                className="w-full p-3 border rounded-xl mt-2 mb-3"
              >
                <option value="">Select size</option>
                {["EU 35", "EU 36", "EU 38", "EU 42", "EU 43"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

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

          {/* Right - Summary & Description */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="font-semibold text-sm md:text-base">
                Product Summary
              </label>
              <textarea
                name="summary"
                placeholder="Add short description"
                onChange={handleChange}
                className="w-full p-4 border rounded-xl mt-2 h-28"
              />
            </div>
            <div>
              <label className="font-semibold text-sm md:text-base">
                Product Description
              </label>
              <textarea
                name="description"
                placeholder="Add full description"
                onChange={handleChange}
                className="w-full p-4 border rounded-xl mt-2 h-40"
              />
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="grid gap-6 py-10 mt-6 border-t">
          <h2 className="text-lg sm:text-xl font-semibold">Product Images</h2>
          <div className="flex flex-wrap gap-4">
            {images.length < 4 && (
              <label
                htmlFor="fileUpload"
                className="flex flex-col justify-center items-center w-28 h-28 sm:w-40 sm:h-40 md:w-[194px] md:h-[194px] border-2 border-dashed rounded-lg cursor-pointer text-center p-3 hover:bg-gray-50"
              >
                <img
                  src={Download}
                  alt=""
                  className="w-6 h-6 sm:w-8 sm:h-8 mb-2"
                />
                <p className="text-xs sm:text-sm text-gray-600">
                  Drag & drop or{" "}
                  <span className="underline text-[#E94E30]">choose file</span>
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400">Max 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  id="fileUpload"
                  onChange={handleImageChange}
                />
              </label>
            )}

            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-[194px] md:h-[194px] border rounded overflow-hidden group"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${idx}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="bg-[#E94E30] text-white px-3 py-1 rounded-md text-xs sm:text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;
