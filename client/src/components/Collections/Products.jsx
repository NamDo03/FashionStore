import React, { useEffect, useState } from "react";
import Product from "./Product";
import { publicRequest } from "../../requestMethod";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Loader from "../Loader";
import { useLocation, useNavigate } from "react-router-dom";
const Products = ({
  sort,
  setResults,
  setTotal,
  results,
  total,
  subCategory,
  category,
  selectedPriceFilter,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    const getProducts = async () => {
      try {
        let apiUrl = `/products?category=${category}`;

        if (subCategory) {
          apiUrl += `&subCategory=${subCategory}`;
        }

        if (sort) {
          apiUrl += `&sort=${sort}`;
        }

        if (selectedPriceFilter) {
          apiUrl += `&price=${selectedPriceFilter}`;
        }

        const res = await publicRequest.get(`${apiUrl}&page=${currentPage}`);
        setProducts(res.data.products);
        setResults(res.data.totalProductsFilter);
        setTotal(res.data.totalProducts);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, [
    category,
    subCategory,
    setResults,
    setTotal,
    currentPage,
    sort,
    selectedPriceFilter,
  ]);

  const totalPages =
    subCategory || selectedPriceFilter
      ? Math.ceil(results / 9)
      : Math.ceil(total / 9);

  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`${
          i === currentPage
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

      const newUrl = `/collections?${queryParams.toString()}`;
      navigate(newUrl);
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className="">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-10 place-items-center">
              {products.map((item) => (
                <Product item={item} key={item._id} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No products in this category.
            </div>
          )}

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
    </div>
  );
};

export default Products;
