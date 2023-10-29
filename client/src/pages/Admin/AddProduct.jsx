import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import { FiChevronDown } from "react-icons/fi";
import { links, sizes } from "../../MyLinks";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { userRequest } from "../../requestMethod";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState([]);

  const [title, setTitle] = useState("");
  const [imgSelected, setImgSelected] = useState([]);
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [color, setColor] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [desc, setDesc] = useState("");

  const clearFields = () => {
    setTitle("");
    setDesc("");
    setImgSelected([]);
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSelectedSizes([]);
    setCheckedItems([]);
    setColor([]);
    setPrice("");

    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const getOptions = () => {
    const selectedCategoryObject = links.find(
      (category) => category.name === selectedCategory
    );
    if (selectedCategoryObject) {
      const options = [];
      selectedCategoryObject.sublinks.forEach((sublink) => {
        sublink.sublink.forEach((option) => {
          options.push(option.name);
        });
      });
      return options;
    }
    return [];
  };

  const handleColorChange = (e) => {
    const inputValue = e.target.value;
    const colors = inputValue.split(",").map((color) => color.trim());
    setColor(colors);
  };

  useEffect(() => {
    const trueValuesArray = [];

    for (const key in checkedItems) {
      if (checkedItems[key] === true) {
        trueValuesArray.push(key);
      }
    }

    setSelectedSizes(trueValuesArray);
  }, [checkedItems]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const uploadImage = async () => {
    if (imgSelected) {
      const urls = [];
      const CLOUD_NAME = "decj4171q";
      const PRESENT_NAME = "darwinShop";
      const FOLDER_NAME = "DarwinShop";
      const URL_API = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const formData = new FormData();
      formData.append("upload_preset", PRESENT_NAME);
      formData.append("folder", FOLDER_NAME);

      for (const file of imgSelected) {
        formData.append("file", file);
        try {
          const res = await axios.post(URL_API, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          urls.push(res.data.secure_url);
        } catch (err) {
          console.log(err);
        }
      }
      return urls;
    }
    return [];
  };

  const createProduct = async () => {
    const newProduct = {
      title,
      desc,
      color,
      price,
      categories: selectedCategory,
      subCat: selectedSubCategory,
      size: selectedSizes,
      img: [],
    };
    try {
      const uploadedImageUrls = await uploadImage();
      newProduct.img = uploadedImageUrls;
      await userRequest.post("/products", newProduct);
      clearFields();
      navigate("/admin/addproduct");
      toast.success("Add Product Successfully.");
    } catch (error) {
      toast.error("Add Failed Product.");
      console.error("Error creating product:", error);
    }
  };
  return (
    <div className="flex w-full min-h-screen text-gray-900 bg-gray-50">
      <Sidebar />
      <div className="flex-1 pb-8 bg-[#f1f5f9] py-16 px-20">
        <div className="rounded-sm border border-stroke bg-white shadow-default">
          <div className="border-b border-stroke py-4 px-6.5">
            <h3 className="font-medium text-black uppercase text-center">
              Add New Product
            </h3>
          </div>
          <form onSubmit={handleSubmit(createProduct)}>
            <div className="p-7">
              <div className="mb-5">
                <label className="mb-3 block text-black">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("title", {
                    required: "Title is Required...",
                  })}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Enter title product"
                  className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default ${
                    errors.title ? "border-red-400" : "border-stroke"
                  }`}
                />
                <p className="text-red-500 text-sm mt-3">
                  {errors.title?.message}
                </p>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-black">
                  Select the product's images{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="fileInput"
                  type="file"
                  {...register("file", {
                    required: "Images are Required...",
                  })}
                  onChange={(e) => setImgSelected(Array.from(e.target.files))}
                  multiple
                  className={`w-full cursor-pointer rounded-lg border-[1.5px] bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter
                  ${errors.file ? "border-red-400" : "border-stroke"}
                  `}
                />
                <p className="text-red-500 text-sm mt-3">
                  {errors.file?.message}
                </p>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-black">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("price", {
                    required: "Price is Required...",
                  })}
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  placeholder="Enter product price"
                  className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default 
                  ${errors.price ? "border-red-400" : "border-stroke"}`}
                />
                <p className="text-red-500 text-sm mt-3">
                  {errors.price?.message}
                </p>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-black">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative z-20 bg-transparent ">
                  <select
                    {...register("category", {
                      required: "Category is Required...",
                    })}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                    className={`relative z-20 w-full appearance-none rounded border bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary cursor-pointer ${
                      errors.category ? "border-red-400" : "border-stroke"
                    }`}
                  >
                    <option value="">Type your category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="accessories">Accessories</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer text-2xl">
                    <FiChevronDown />
                  </span>
                </div>
                <p className="text-red-500 text-sm mt-3">
                  {errors.category?.message}
                </p>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-black">
                  SubCategory <span className="text-red-500">*</span>
                </label>
                <div className="relative z-20 bg-transparent ">
                  <select
                    {...register("subCategory", {
                      required: "SubCategory is Required...",
                    })}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    className={`relative z-20 w-full appearance-none rounded border bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary cursor-pointer ${
                      errors.price ? "border-red-400" : "border-stroke"
                    }`}
                  >
                    <option value="">Type your subcategory</option>
                    {getOptions().map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer text-2xl">
                    <FiChevronDown />
                  </span>
                </div>
                <p className="text-red-500 text-sm mt-3">
                  {errors.subCategory?.message}
                </p>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-black">Color</label>
                <input
                  type="text"
                  onChange={handleColorChange}
                  value={color}
                  placeholder="Enter product color"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default"
                />
              </div>

              <div className="mb-7">
                <label className="mb-3 block text-black">Size</label>
                <div className="flex flex-row justify-start items-center gap-20">
                  {sizes.map((s) => (
                    <label
                      key={s.id}
                      htmlFor={s.id}
                      className="flex cursor-pointer select-none items-center"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id={s.id}
                          value={s.value}
                          className="sr-only"
                          onChange={() => {
                            setCheckedItems((prevState) => ({
                              ...prevState,
                              [s.id]: !prevState[s.id],
                            }));
                          }}
                        />
                        <div
                          className={`mr-4 flex h-6 w-6 items-center justify-center rounded border ${
                            checkedItems[s.id] && "border-primary bg-gray-2"
                          }`}
                        >
                          <span
                            className={`h-3 w-3 rounded-sm ${
                              checkedItems[s.id] && "bg-primary"
                            }`}
                          ></span>
                        </div>
                      </div>
                      {s.value}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-black">Description</label>
                <textarea
                  rows={6}
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  placeholder="Type your message"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                ></textarea>
              </div>

              <button className="flex w-full justify-center rounded bg-primary text-white p-3 font-medium hover:bg-primary/80">
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
