import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { publicRequest } from "../../requestMethod";

const FeaturedProducts = () => {
  const contentRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`/products/ramdomProducts`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const shuffledProducts = products.sort(() => Math.random() - 0.5);
    const newRandomProducts = shuffledProducts.slice(0, 6);
    setRandomProducts(newRandomProducts);
  }, [products]);

  const scrollLeft = () => {
    contentRef.current.scrollLeft -= contentRef.current.scrollWidth / 6;
    setCanScrollRight(true);
    setCanScrollLeft(
      contentRef.current.scrollLeft > contentRef.current.scrollWidth / 6
    );
  };

  const scrollRight = () => {
    contentRef.current.scrollLeft += contentRef.current.scrollWidth / 6;
    setCanScrollLeft(true);
    setCanScrollRight(
      contentRef.current.scrollLeft +
        contentRef.current.clientWidth +
        contentRef.current.scrollWidth / 6 <
        contentRef.current.scrollWidth
    );
  };

  return (
    <div className="lg:px-36 px-5 py-12">
      <div className="flex justify-between items-center" data-aos="fade-right">
        <h2 className="text-xl lg:text-3xl font-semibold pb-8">
          Featured products
        </h2>
        <div className="">
          <button
            onClick={scrollLeft}
            className={`border p-3 rounded-l-lg ${
              canScrollLeft ? "" : "text-slate-300"
            }`}
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={scrollRight}
            className={`border p-3 rounded-r-lg ${
              canScrollRight ? "" : "text-slate-300"
            }`}
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
      <div
        ref={contentRef}
        className="flex justify-start gap-4 lg:gap-10 overflow-x-auto scroll-smooth scrollbar-hide"
        data-aos="fade-up"
      >
        {randomProducts.map((item) => (
          <div key={item._id}>
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
