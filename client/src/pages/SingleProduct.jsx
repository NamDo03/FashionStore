import React, { useEffect, useState } from "react";
import { PiCreditCardBold } from "react-icons/pi";
import { FiTag } from "react-icons/fi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiRefund2Line } from "react-icons/ri";
import RelatedProducts from "../components/RelatedProducts";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { addProduct } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Breadcrumbs from "../components/Breadcrumbs";
import Loader from "../components/Loader";

const SingleProduct = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showErrorColor, setShowErrorColor] = useState(false);
  const [showErrorSize, setShowErrorSize] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + productId);
        setProduct(res.data);
        setSelectedImg(res.data.img[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [productId]);

  useEffect(() => {
    if (product.img && product.img.length > 0 && !selectedImg) {
      setSelectedImg(product.img[0]);
    }
  }, [product, selectedImg]);

  const handleClick = () => {
    if (!selectedSize && !selectedColor) {
      setShowErrorSize(true);
      setShowErrorColor(true);
    } else if (product.color && product.color.length > 1 && !selectedColor) {
      setShowErrorSize(false);
      setShowErrorColor(true);
    } else if (!selectedSize) {
      setShowErrorSize(true);
      setShowErrorColor(false);
    } else {
      setShowErrorSize(false);
      setShowErrorColor(false);
      dispatch(
        addProduct({ ...product, quantity, selectedColor, selectedSize })
      );
      toast.success("Added product to cart successfully.");
    }
  };

  const breadCrumbs = [
    {
      name: "Collections",
      url: `/collections?category=${product.categories}`,
    },
    {
      name: `${product.title}`,
    },
  ];
  console.log(setSelectedImg);
  return (
    <div className="lg:px-36 px-5 py-32 gap-10 flex flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <Breadcrumbs breadCrumbs={breadCrumbs} />
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex flex-1 sm:gap-5">
              <div className="flex-1">
                {product.img &&
                  product.img.length > 0 &&
                  product.img.map((img, imgIndex) => (
                    <img
                      className=" hidden sm:block w-full h-[150px] object-cover cursor-pointer mb-3 rounded-lg"
                      onClick={() => setSelectedImg(img)}
                      key={imgIndex}
                      src={img}
                      alt=""
                    />
                  ))}
              </div>
              <div className="sm:flex-[5]">
                <img
                  className="w-full max-h-[800px] object-cover rounded-lg"
                  src={selectedImg}
                  alt=""
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <h1 className="font-medium text-2xl">{product.title}</h1>
              <span className="font-medium text-2xl">${product.price}</span>
              <p className="text-text">{product.desc}</p>
              <div className="py-5">
                <div className="flex flex-col sm:gap-8 gap-5">
                  {product.size && (
                    <div className="flex-1 flex flex-col gap-3">
                      <h2 className="font-medium">Avaliable Colors</h2>
                      <div className="flex gap-3 justify-start items-center">
                        {product.size.map((size) => (
                          <span
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`border border-primary rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer ${
                              selectedSize === size
                                ? "bg-primary text-white"
                                : ""
                            }`}
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                      {showErrorSize && (
                        <p className="text-red-500 text-sm ">
                          Please select size before adding to cart.
                        </p>
                      )}
                    </div>
                  )}
                  {product.color && product.color.length > 1 && (
                    <div className="flex-1 flex flex-col gap-3">
                      <h2 className="font-medium">Avaliable Colors</h2>
                      <div className="flex gap-3 justify-start items-center">
                        {product.color.map((color, indexC) => (
                          <span
                            key={indexC}
                            onClick={() => setSelectedColor(color)}
                            className={`w-[20px] h-[20px] rounded-full cursor-pointer border border-black ${
                              selectedColor === color
                                ? "outline outline-2 outline-offset-2"
                                : ""
                            }`}
                            style={{ backgroundColor: color }}
                          ></span>
                        ))}
                      </div>
                      {showErrorColor && (
                        <p className="text-red-500 text-sm ">
                          Please select color before adding to cart.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center pb-12 gap-10 border-b-2">
                <div className="flex font-semibold rounded-lg border border-primary">
                  <span
                    onClick={() =>
                      setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                    className="w-[45px] h-[45px] flex items-center justify-center cursor-pointer"
                  >
                    -
                  </span>
                  <span className="w-[45px] h-[45px] flex items-center justify-center border-x-2">
                    {quantity}
                  </span>
                  <span
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-[45px] h-[45px] flex items-center justify-center cursor-pointer"
                  >
                    +
                  </span>
                </div>
                <button
                  onClick={handleClick}
                  className="bg-primary hover:bg-primary/90 py-2.5 px-6 text-white rounded-lg"
                >
                  Add to cart
                </button>
              </div>
              <div className="flex flex-col gap-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="bg-primary-second rounded-full w-[45px] h-[45px] flex items-center justify-center text-xl">
                      <PiCreditCardBold />
                    </span>
                    <span className="font-medium text-sm text-text">
                      Secure Payment
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <span className="bg-primary-second rounded-full w-[45px] h-[45px] flex items-center justify-center text-xl">
                      <FiTag />
                    </span>
                    <span className="font-medium text-sm text-text">
                      Size & Fit
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="bg-primary-second rounded-full w-[45px] h-[45px] flex items-center justify-center text-xl">
                      <LiaShippingFastSolid />
                    </span>
                    <span className="font-medium text-sm text-text">
                      Free Shipping
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <span className="bg-primary-second rounded-full w-[45px] h-[45px] flex items-center justify-center text-xl">
                      <RiRefund2Line />
                    </span>
                    <span className="font-medium text-sm text-text">
                      Refund & Returns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:pt-24 pt-10">
            <RelatedProducts cat={product.categories} />
          </div>
        </>
      )}
    </div>
  );
};

export default SingleProduct;
