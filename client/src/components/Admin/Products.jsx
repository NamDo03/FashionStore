import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { PiPencilSimpleLineFill, PiTrashSimpleDuotone } from "react-icons/pi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { toast } from "react-toastify";
import { publicRequest, userRequest } from "../../requestMethod";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalProducts / 6);

  const currentPageFromUrl =
    parseInt(new URLSearchParams(window.location.search).get("page")) || 1;

  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`${
          i === currentPageFromUrl
            ? "bg-primary text-white"
            : "bg-white text-primary hover:bg-gray-100"
        } border border-gray-300 px-4 py-2 text-base font-semibold`}
      >
        {i}
      </button>
    );
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("page", newPage);

      const newUrl = `/admin/products?${queryParams.toString()}`;
      navigate(newUrl);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          `/products?pageSize=6&page=${currentPageFromUrl}`
        );
        setProducts(res.data.products);
        setTotalProducts(res.data.totalProductsFilter);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [currentPageFromUrl]);

  const handleDelete = async (productId) => {
    try {
      await userRequest.delete("/products/" + productId);
      toast.success("Deleted Product Successful.");
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (err) {
      toast.error("Deleted Product Failed.");
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between py-7 px-10">
        <div className="">
          <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">
            Products
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Let's grow to your business! Create your product and upload here
          </p>
        </div>
        <button className="inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-primary rounded-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1">
          <AiOutlinePlus className="w-6 h-6 fill-current" />
          <span
            onClick={() => navigate("/admin/addproduct")}
            className="text-sm font-semibold tracking-wide"
          >
            Create Product
          </span>
        </button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <table className="w-full border-b border-gray-200">
            <thead className="text-center">
              <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                <td className="pl-10">Title</td>
                <td className="py-4 px-4 text-center">Price</td>
                <td className="py-4 px-4 text-center">Size</td>
                <td className="py-4 px-4 text-center">Color</td>
                <td className="py-4 px-4 text-center">
                  <FaFilter />
                </td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-100 transition-colors group"
                >
                  <td className="flex gap-x-4 items-center py-4 pl-10">
                    <img
                      className="w-40 aspect-[4/5] rounded-lg object-cover object-top border border-gray-200"
                      src={product.img[0]}
                      alt={product.title}
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-700">
                        {product.title}
                      </h2>
                      <div className="font-medium text-gray-400">
                        {product.categories}/{product.subCat}
                      </div>
                    </div>
                  </td>
                  <td className="font-medium text-center">${product.price}</td>
                  <td className="font-medium text-center">
                    {product.size.slice(0, 3).join(", ")}
                    {product.size.length > 3 && " ..."}
                  </td>
                  <td className="font-medium text-center">
                    {product.color.slice(0, 2).join(", ")}
                    {product.color.length > 2 && " ..."}
                  </td>
                  <td>
                    <span className="inline-block w-20 group-hover:hidden">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                    <div className="hidden group-hover:flex group-hover:w-20 group-hover:items-center group-hover:text-gray-500 group-hover:gap-x-2">
                      <button
                        onClick={() =>
                          navigate("/admin/editproduct/" + product._id)
                        }
                        className="p-2 hover:rounded-md hover:bg-gray-200"
                      >
                        <PiPencilSimpleLineFill className="w-6 h-6 fill-current" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 hover:rounded-md hover:bg-gray-200"
                      >
                        <PiTrashSimpleDuotone className="w-6 h-6 fill-current" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages >= 2 && (
            <div className="mt-20 flex justify-center items-center isolate ">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="border border-gray-300 px-2 py-2 text-2xl text-gray-400 hover:text-primary rounded-l-md"
              >
                <FiChevronLeft />
              </button>
              {pageButtons}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="border border-gray-300 px-2 py-2 text-2xl text-gray-400 hover:text-primary rounded-r-md"
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
