import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import { links, sizes } from "../../MyLinks";
import { FiChevronDown } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethod";
import { toast } from "react-toastify";
import axios from "axios";
import { userRequest } from "../../requestMethod";
import { useForm } from "react-hook-form";

const UpdateProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.pathname.split("/")[3];
  const [checkedItems, setCheckedItems] = useState([]);
  const [fileSelected, setFileSelected] = useState([]);

  const [title, setTitle] = useState("");
  const [imgSelected, setImgSelected] = useState([]);
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [color, setColor] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + productId);
        setTitle(res.data.title);
        setImgSelected(res.data.img);
        setPrice(res.data.price);
        setSelectedCategory(res.data.categories);
        setSelectedSubCategory(res.data.subCat);
        setColor(res.data.color);
        setSelectedSizes(res.data.size);
        setDesc(res.data.desc);
        const newCheckedItems = {};
        res.data.size.forEach((size) => {
          newCheckedItems[size] = true;
        });
        setCheckedItems(newCheckedItems);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [productId]);

  useEffect(() => {
    const trueValuesArray = [];

    for (const key in checkedItems) {
      if (checkedItems[key] === true) {
        trueValuesArray.push(key);
      }
    }

    setSelectedSizes(trueValuesArray);
  }, [checkedItems]);

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "all" });

  useEffect(() => {
    setValue("title", title);
    setValue("price", price);
    setValue("category", selectedCategory);
    setValue("subCategory", selectedSubCategory);
  }, [setValue, title, price, selectedCategory, selectedSubCategory]);

  const uploadImage = async () => {
    if (fileSelected) {
      const urls = [];
      const CLOUD_NAME = "decj4171q";
      const PRESENT_NAME = "darwinShop";
      const FOLDER_NAME = "DarwinShop";
      const URL_API = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const formData = new FormData();
      formData.append("upload_preset", PRESENT_NAME);
      formData.append("folder", FOLDER_NAME);

      for (const file of fileSelected) {
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

  const editProduct = async () => {
    const editProduct = {
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
      if (fileSelected.length > 0) {
        const uploadedImageUrls = await uploadImage();
        editProduct.img = uploadedImageUrls;
      } else {
        editProduct.img = imgSelected;
      }
      await userRequest.put("/products/" + productId, editProduct);
      navigate("/admin/products");
      toast.success("Update Product Successfully.");
    } catch (error) {
      toast.error("Update Failed Product.");
      console.error("Error Update product:", error);
    }
  };

  return (
    <div className="flex w-full min-h-screen text-gray-900 bg-gray-50">
      <Sidebar />
      <div className="flex-1 pb-8 bg-[#f1f5f9] py-16 px-20">
        <div className="rounded-sm border border-stroke bg-white shadow-default">
          <div className="border-b border-stroke py-4 px-6.5">
            <h3 className="font-medium text-black uppercase text-center">
              Edit Product
            </h3>
          </div>
          <form onSubmit={handleSubmit(editProduct)}>
            <div className="p-7">
              <div className="mb-5">
                <label className="mb-3 block text-black">Title</label>
                <input
                  type="text"
                  {...register("title", {
                    required: "Title is Required...",
                  })}
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                </label>
                <div className="flex flex-row justify-start gap-20 mb-6">
                  {imgSelected &&
                    imgSelected.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt=""
                        className="w-40 aspect-[4/5] rounded-lg object-cover object-top border border-gray-200"
                      />
                    ))}
                </div>

                <input
                  id="fileInput"
                  type="file"
                  onChange={(e) => {
                    const selectedImages = Array.from(e.target.files);
                    const imageUrls = selectedImages.map((image) =>
                      URL.createObjectURL(image)
                    );
                    setImgSelected(imageUrls);
                    setFileSelected(Array.from(e.target.files));
                  }}
                  multiple
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-black">Price</label>
                <input
                  type="number"
                  {...register("price", {
                    required: "Price is Required...",
                  })}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter product price"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default"
                />
                <p className="text-red-500 text-sm mt-3">
                  {errors.price?.message}
                </p>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-black">Category</label>
                <div className="relative z-20 bg-transparent ">
                  <select
                    {...register("category", {
                      required: "Category is Required...",
                    })}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary cursor-pointer"
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
                <label className="mb-3 block text-black">SubCategory</label>
                <div className="relative z-20 bg-transparent ">
                  <select
                    {...register("subCategory", {
                      required: "SubCategory is Required...",
                    })}
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary cursor-pointer"
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
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Type your message"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                ></textarea>
              </div>

              <button className="flex w-full justify-center rounded bg-primary text-white p-3 font-medium hover:bg-primary/80">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
