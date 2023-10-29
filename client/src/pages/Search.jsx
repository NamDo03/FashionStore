import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { publicRequest } from "../requestMethod";

const Search = ({ setShowSearch }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      if (search.trim() !== "") {
        try {
          const res = await publicRequest.get(
            `/products/search?title=${search}`
          );
          setSearchResults(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getProducts();
  }, [search]);

  return (
    <div className=" fixed w-full h-full top-0 left-0 z-[999] bg-white animate-slideSearchWindow">
      <div className="w-full flex justify-center px-12 py-3 relative border-b">
        <input
          type="text"
          autoFocus
          className="max-w-[1200px] h-14 text-center text-3xl font-semibold outline-none"
          placeholder="Search for products."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span
          onClick={() => setShowSearch(false)}
          className=" absolute text-4xl right-10 top-1/2 -translate-y-1/2 hover:text-hover cursor-pointer"
        >
          <MdClose />
        </span>
      </div>
      <div className=" max-w-[1000px] my-0 mx-auto overflow-y-clip">
        {Array.isArray(searchResults) && searchResults.length > 0 ? (
          searchResults.map((search) => (
            <div
              key={search._id}
              onClick={() => {
                navigate("/product/" + search._id);
                setShowSearch(false);
              }}
              className="flex items-center gap-4 py-2 border-b cursor-pointer"
            >
              <div className="w-28 h-36">
                <img
                  src={search.img[0]}
                  alt=""
                  className="w-full h-full object-cover object-top rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-medium">{search.title}</h1>
                <span>Category: {search.categories}</span>
                <span>${search.price}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-2xl text-center text-gray-500 pt-10">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
